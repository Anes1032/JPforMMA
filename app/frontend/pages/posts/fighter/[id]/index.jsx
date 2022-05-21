import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import Banner from "~/components/atoms/Banner";
import Articles from "~/components/organisms/posts/archive/Articles";
import BreadcrumbsJsonLd from "~/components/JsonLd/Breadcrumbs";
import style from "~/pages/posts/index.module.scss";

const Fighter = ({ data }) => {
  const breadcrumbs = [
    {
      url: `/posts/fighter/${data.fighters.id}`,
      name: `${data.fighter.name}`,
    },
  ];
  const title = `${data.fighter.name}に関する記事一覧｜JAPAN PORTAL for UFC`;
  const canonical = buildCanonical("tags", data.fighters.id);
  const path = `/posts/fighter/${data.fighters.id}`;
  return (
    <Layout title={title} canonical={canonical}>
      <BreadcrumbsJsonLd breadcrumbs={breadcrumbs} />
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Articles
            data={data.posts}
            pagenations={data.pagenations}
            name={data.fighter.name}
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
            <Banner
              url={"/news/translaters/"}
              src={"translaters-banner-small1.png"}
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
    key: "fighters",
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

export default Fighter;
