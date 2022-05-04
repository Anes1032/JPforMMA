# -*- coding: utf-8 -*-

import requests
import time
from bs4 import BeautifulSoup
from googletrans import Translator
import MySQLdb

import config

def select_posts() :
  # MySQLに接続
  conn = MySQLdb.connect(
    user=config.MYSQL_DB_USER,
    passwd=config.MYSQL_DB_PASSWORD,
    host=config.MYSQL_DB_HOST,
    db=config.MYSQL_DB_NAME,
    use_unicode=True,
    charset="utf8"
  )
  # カーソルを取得する
  cur = conn.cursor()

  # SQL（データベースを操作するコマンド）を実行する
  sql = "select reference_url from posts"
  cur.execute(sql)

  # 実行結果を取得する
  rows = cur.fetchall()

  # tupleからlistに変換
  list = []
  for row in rows:
    list.append(''.join(row))

  cur.close
  conn.close

  return list

storage_url_list = select_posts()

def get_posts() :

  list = []

  # def translate(text) :
  #   API_KEY = '0c3ce9cf-8f89-20be-6431-5f280d991a14:fx'
  #   source_lang = 'EN'
  #   target_lang = 'JA'
  #   params = {
  #     'auth_key' : API_KEY,
  #     'text' : text,
  #     'source_lang' : source_lang, # 翻訳対象の言語
  #     "target_lang": target_lang  # 翻訳後の言語
  #   }
  #   request = requests.post("https://api-free.deepl.com/v2/translate", data=params) # URIは有償版, 無償版で異なるため要注意
  #   result = request.json()
  #   return result['translations'][0]['text']

  def get_text(item) :
    if item :
      return item.text
    else:
      return ''

  def get_href(item) :
    if item :
      return item.get('href')
    else:
      return ''

  def get_src(item) :
    if item :
      return item.get('src')
    else:
      return ''

  def get_time(item) :
    if item :
      return item.get('datetime')
    else:
      return ''

  # 翻訳
  def translate(text) :
    if text :
      tr = Translator()
      return tr.translate(text=text, src="en", dest="ja").text.replace(' ', '')
    else :
      return ""
  
  for i in range(15) :
    time.sleep(5.0)
    pageNumber = i + 1
    url = "https://www.mmamania.com/latest-news/archives/" + str(pageNumber)
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "html.parser")
    doms = soup.select('.c-entry-box--compact__image-wrapper')
    links = [dom.get('href') for dom in doms]
    for link in links :
      time.sleep(3.0)

      if(link in storage_url_list) :
        break

      res = requests.get(link)
      soup = BeautifulSoup(res.text, "html.parser")
      head_info = soup.find('head')
      en_title = get_text(soup.select_one('.c-page-title'))
      ja_title = translate(en_title)
      meta_description = head_info.find('meta', {'name' : 'description'})
      en_sub_title = meta_description['content']
      ja_sub_title = translate(en_sub_title)
      created_by = get_text(soup.select_one('.c-byline__author-name'))
      created_by_address = get_href(soup.select_one('.c-byline__twitter-handle'))
      og_image = head_info.find('meta', {'property' : 'og:image'})
      image_url = og_image['content']
      video_url = get_src(soup.select_one('.c-video-embed--media iframe'))
      post_time = get_time(soup.select_one('time'))
      en_content = soup.select_one('.c-entry-content')

      # 以下HTMLを整形

      # 要素の削除（扱いが難しい）
      if len(en_content.find_all(['hr', 'iframe', 'picture', 'figure', 'aside', 'blockquote', 'script'])) > 0 :
        for e in en_content.find_all(['hr', 'iframe', 'picture', 'figure', 'aside', 'blockquote', 'script']) :
          e.extract()

      # div,ul,liタグは取り除いて、p,a,strong,hタグのみに
      if len(en_content.find_all(['div','ul', 'li'])) > 0 :
        for e in en_content.find_all(['div','ul', 'li']) :
          e.unwrap()

      # href以外を削除して要素を整形
      for e in en_content.find_all() :
        if e.get('href') :
          href = e.get('href')
          e.attrs.clear()
          e.attrs['href'] = href
        else :
          e.attrs.clear()

      # 文字数制限に引っかかるのでpとhに分割して翻訳
      ja_content = ''.join([translate(text=str(el).replace('\n', '')) for el in en_content.find_all(['p', 'h3'])])

      # 上記によってahrefとなってしまったのでa hrefに戻す
      ja_content = ja_content.replace('ahref', 'a href').replace('Ahref', 'a href')

      # 改行の削除/wrapしてるdiv要素の削除
      en_content = ''.join([str(el).replace('\n', '') for el in en_content.find_all(['p', 'h3'])])
      
      list.append([en_title, ja_title, en_sub_title, ja_sub_title, en_content, ja_content, image_url, video_url, created_by, created_by_address, link, post_time])
      print([en_title, ja_title, en_sub_title, ja_sub_title, en_content, ja_content, image_url, video_url, created_by, created_by_address, link, post_time])
    else :
      continue
    break
  list.reverse()
  return list

def insert_db(array) :
  # MySQLに接続
  conn = MySQLdb.connect(
    user=config.MYSQL_DB_USER,
    passwd=config.MYSQL_DB_PASSWORD,
    host=config.MYSQL_DB_HOST,
    db=config.MYSQL_DB_NAME,
    use_unicode=True,
    charset="utf8"
  )

  # カーソルを取得
  cur = conn.cursor()

  # SQL文を実行
  sql = ('''
  INSERT INTO posts 
    (en_title, ja_title, en_sub_title, ja_sub_title, en_content, ja_content, image_url, video_url, created_by, created_by_address, reference_url, post_time) 
  VALUES 
    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
  ''')

  for el in array :
    cur.execute(sql , (el[0], el[1], el[2], el[3], el[4], el[5], el[6], el[7], el[8], el[9], el[10],el[11]))

  conn.commit()
  
  # 接続をクローズ
  cur.close
  conn.close

if __name__ == '__main__':
  array = get_posts()
  insert_db(array)