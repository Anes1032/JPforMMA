import Api from "~/lib/api";
import { getSession } from "next-auth/react";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import Articles from "~/components/organisms/posts/archive/Articles";
import BreadcrumbsJsonLd from "~/components/JsonLd/Breadcrumbs";
import style from "~/pages/posts/index.module.scss";

const Private = ({ data }) => {
  const breadcrumbs = [
    {
      url: "/posts/",
      name: "非公開記事一覧",
    },
  ];
  const title = "非公開記事一覧｜JAPAN PORTAL for UFC";
  const canonical = buildCanonical("posts");
  const robots = "noindex, nofollow";
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
  const page = context.query.page ? context.query.page : 1;
  const options = {
    key: "private",
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

export default Private;
