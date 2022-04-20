import Api from "~/lib/api";
import Layout from "~/components/molecules/Layout";
import Breadcrumbs from "~/components/molecules/Breadcrumbs";
import Ranking from "~/components/atoms/Ranking";
import Tags from "~/components/atoms/Tags";
import Posts from "~/components/organisms/posts/archive/Posts";
import style from "~/pages/posts/index.module.scss";

const Index = ({ data }) => {
  const breadcrumbs = [
    {
      url: "/posts/",
      name: `${data.tag.name}`,
    },
  ];
  return (
    <Layout>
      <div className={style.content}>
        <Breadcrumbs data={breadcrumbs} />
        <div className={style.box}>
          <Posts
            data={data.posts}
            pagenations={data.pagenations}
            name={`"${data.tag.name}"`}
          />
          <div className={style.sidebar}>
            <Ranking data={data.rankings} />
            <Tags name={"急上昇ワード"} data={data.tags} slug={"tags"} />
            <Tags
              name={"人気UFCファイター"}
              data={data.fighters}
              slug={"fighters"}
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
  const data = new Api("tags", `/${id}?page=${page}`).getData();

  return {
    props: data,
  };
};

export default Index;
