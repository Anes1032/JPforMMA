import Layout from "~/components/common/Layout";
import Breadcrumbs from "~/components/common/Breadcrumbs";
import Article from "~/components/pages/posts/detail/Article";
import BackLinks from "~/components/pages/posts/detail/BackLinks";
import Ranking from "~/components/pages/common/Ranking";
import Tags from "~/components/pages/common/Tags";
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
  return (
    <Layout>
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Article data={data.post} />
          <div className={style.sidebar}>
            <Ranking />
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
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
  const res = await fetch(requestUrl);
  const data = await res.json();

  return {
    props: data,
  };
};

export default Index;
