import Api from "~/lib/api";
import { getSession } from "next-auth/react";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/posts/[id]/edit/index.module.scss";

const Edit = ({ data }) => {
  const breadcrumbs = [
    {
      url: "/posts/",
      name: "記事一覧",
    },
    {
      url: `/posts/${data.post.id}`,
      name: data.post.en_title,
    },
  ];
  const title = `${data.post.en_title}｜JAPAN PORTAL for UFC`;
  const description = data.post.en_sub_title;
  const canonical = buildCanonical("posts", data.post.id);
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
        <div className={style.box}>
          <p className={style.title}>タイトル</p>
          <div className={style.inner}>
            <div className={style.original}>
              <p>{data.post.en_title}</p>
            </div>
            <div className={style.textarea}>
              <textarea
                className={style.textarea_main}
                defaultValue={data.post.ja_title}
              />
              <div className={style.textarea_dummy} aria-hidden="true"></div>
            </div>
          </div>
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
  const apiParams = {
    id,
  };
  const data = await new Api("post", apiParams).getData();
  return {
    props: {
      data: data.data,
    },
  };
};

export default Edit;
