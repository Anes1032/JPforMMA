import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Article from "~/components/organisms/posts/detail/Article";
import BackLinks from "~/components/organisms/posts/detail/BackLinks";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import ArticleJsonLd from "~/components/JsonLd/Article";
import BreadcrumbsJsonLd from "~/components/JsonLd/Breadcrumbs";
import style from "~/pages/posts/[id]/index.module.scss";

const Index = ({ data }) => {
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
  return (
    <Layout
      title={title}
      description={description}
      canonical={canonical}
      ogp={ogp}
    >
      <ArticleJsonLd data={data.post} />
      <BreadcrumbsJsonLd breadcrumbs={breadcrumbs} />
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Article data={data.post} />
          <div className={style.sidebar}>
            <Ranking data={data.rankings} />
            <BackLinks />
            <Tags name={"関連するキーワード"} data={data.tags} slug={"tags"} />
          </div>
        </div>
      </div>
      <p></p>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const id = params?.id;
  const data = new Api("post", `/${id}`).getData();

  return {
    props: data,
  };
};

export default Index;
