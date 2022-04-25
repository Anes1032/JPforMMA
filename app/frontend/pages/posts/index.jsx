import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import Articles from "~/components/organisms/posts/archive/Articles";
import BreadcrumbsJsonLd from "~/components/JsonLd/Breadcrumbs";
import style from "~/pages/posts/index.module.scss";

const Posts = ({ data }) => {
  const breadcrumbs = [
    {
      url: "/posts/",
      name: "記事一覧",
    },
  ];
  const title = "記事一覧｜JAPAN PORTAL for UFC";
  const canonical = buildCanonical("posts");
  return (
    <Layout title={title} canonical={canonical}>
      <BreadcrumbsJsonLd breadcrumbs={breadcrumbs} />
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Articles
            data={data.posts}
            pagenations={data.pagenations}
            name={"記事一覧"}
          />
          <div className={style.sidebar}>
            <Ranking data={data.rankings} />
            <Tags name={"急上昇ワード"} data={data.tags} slug={"tag"} />
            <Tags
              name={"人気UFCファイター"}
              data={data.fighters}
              slug={"fighter"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const page = query.page ? query.page : 1;
  const options = {
    key: "posts",
    params: {
      page,
    },
  };
  const data = await new Api(options).getData();

  return {
    props: {
      data: data.data,
    },
  };
};

export default Posts;
