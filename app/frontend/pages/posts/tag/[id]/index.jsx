import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import Articles from "~/components/organisms/posts/archive/Articles";
import BreadcrumbsJsonLd from "~/components/JsonLd/Breadcrumbs";
import style from "~/pages/posts/index.module.scss";

const Tag = ({ data }) => {
  const breadcrumbs = [
    {
      url: `/posts/tag/${data.tag.id}`,
      name: `${data.tag.name}`,
    },
  ];
  const title = `${data.tag.name}に関する記事一覧｜JAPAN PORTAL for UFC`;
  const canonical = buildCanonical("tags", data.tag.id);
  const path = `/posts/tag/${data.tag.id}`;
  return (
    <Layout title={title} canonical={canonical}>
      <BreadcrumbsJsonLd breadcrumbs={breadcrumbs} />
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Articles
            data={data.posts}
            pagenations={data.pagenations}
            name={data.tag.name}
            path={path}
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

export const getServerSideProps = async ({ params, query }) => {
  const id = params?.id;
  const page = query.page ? query.page : 1;
  const options = {
    key: "tags",
    id,
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

export default Tag;
