import { getPostTime } from "~/lib/util";
import style from "~/components/pages/posts/detail/Article/index.module.scss"

const Article = (data) => {
  const post = data.data
  const icons = (n) => {
    const baseUrl = `http://twitter.com/share?url=https://mma.jp-portal.com/posts/${post.id}`
    return [
      {
        name: "twitter",
        url: `http://twitter.com/share?url=${baseUrl}&text=${post.ja_title}`
      },
      {
        name: "facebook",
        url: `https://www.facebook.com/share.php?u=${baseUrl}`
      },
      {
        name: "line",
        url: `https://social-plugins.line.me/lineit/share?url=${baseUrl}`
      }
    ].map((item, i) => 
      <a className={style.icon} href={item.url} target="_blank" key={i}>
        <img 
          src={`/images/${item.name}${n}.svg`}
          alt={"twitter"}
        />
      </a> 
    )
  }
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.sns}>
          {icons(1)}
        </div>
      </div>
      <div className={style.body}>
        <h1 className={style.title}>{post.en_title}</h1>
        <h2 className={style.description}>{post.en_sub_title}</h2>
          <img 
            className={style.image}
            src={post.image_url}
            alt={post.en_title}
            width={540}
            height={405}
          />
        <div className={style.infos}>
          {post.post_time && (
              <span className={style.time}>
                <img
                  src={"/images/clock-grey.svg"}
                  width={16}
                  height={16}
                />
                {getPostTime(post.post_time)}
              </span>
            )}
        </div>
        <div className={style.content} dangerouslySetInnerHTML={{__html: post.en_content}}></div>
        {post.video_url && (
          <iframe
            className={style.video}
            src={post.video_url}
            width={540}
            height={304}
          />
        )}
      </div>
      <div className={style.bottom}>
        <div className={style.sns}>
          {icons(2)}
        </div>
      </div>
    </div>
  )
}

export default Article