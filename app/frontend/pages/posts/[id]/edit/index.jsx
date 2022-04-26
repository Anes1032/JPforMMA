import Api from "~/lib/api";
import { useState } from "react";
import Router from "next/router";
import { getSession } from "next-auth/react";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/posts/[id]/edit/index.module.scss";

const Edit = ({ data }) => {
  console.log(data);
  const items = [
    {
      name: "タイトル",
      key: "title",
    },
    {
      name: "サブタイトル",
      key: "sub_title",
    },
    {
      name: "本文",
      key: "content",
    },
  ];
  const initalTextareaContent = {
    title: data.post.ja_title,
    sub_title: data.post.sub_title,
    content: data.post.ja_content,
  };
  const [textareaContent, setTextareaContent] = useState(initalTextareaContent);
  const updateTextareaContent = (key, value) => {
    const copiedTextareaContent = { ...textareaContent };
    copiedTextareaContent[key] = value + "\u200b";
    setTextareaContent(copiedTextareaContent);
  };
  const updateData = async () => {
    const nextStatusId =
      data.post.status_id === 2 || data.post.status_id === 3 ? 3 : 1;
    const options = {
      key: "post_update",
      id: data.post.id,
      params: {
        ja_title: textareaContent.title,
        ja_sub_title: textareaContent.sub_title,
        ja_content: textareaContent.content,
        status_id: nextStatusId,
      },
    };
    const result = await new Api(options).patchData();
    alert(result.message);
    Router.push(`/posts/${data.post.id}`);
  };
  const statusName =
    data.post.status_id === 1
      ? "公開済み"
      : data.post.status_id === 2
      ? "非公開"
      : "確認待ち";
  const title = `${data.post.en_title}｜JAPAN PORTAL for UFC`;
  const description = data.post.en_sub_title;
  const canonical = buildCanonical("posts", data.post.id, "edit");
  const ogp = data.post.image_url;
  const robots = "noindex, nofollow";
  return (
    <Layout
      title={title}
      description={description}
      canonical={canonical}
      ogp={ogp}
      robots={robots}
    >
      <div className={style.content}>
        <p className={style.status}>{statusName}</p>
        {items.map((item) => (
          <div className={style.box} key={item.key}>
            <p className={style.title}>{item.name}</p>
            <div className={style.inner}>
              <div
                className={style.original}
                dangerouslySetInnerHTML={{
                  __html: data.post[`en_${item.key}`],
                }}
              ></div>
              <div className={style.textarea}>
                <textarea
                  className={style.textarea_main}
                  defaultValue={data.post[`ja_${item.key}`]}
                  onInput={(e) =>
                    updateTextareaContent(item.key, e.target.value)
                  }
                />
                <div className={style.textarea_dummy} aria-hidden="true">
                  {textareaContent[item.key]}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={style.btn}>
          <button className={style.text} onClick={updateData}>
            更新
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        statusCode: 301,
        destination: "/user/login",
      },
    };
  }
  const id = context.params?.id;
  const options = {
    key: "post",
    id,
  };
  const data = await new Api(options).getData();
  return {
    props: {
      data: data.data,
    },
  };
};

export default Edit;
