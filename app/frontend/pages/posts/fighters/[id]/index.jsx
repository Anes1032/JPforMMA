import Layout from "~/components/common/Layout";
import Breadcrumbs from "~/components/common/Breadcrumbs";
import Ranking from "~/components/pages/common/Ranking";
import Tags from "~/components/pages/common/Tags";
import Posts from "~/components/pages/posts/archive/Posts";
import style from "~/pages/posts/index.module.scss";

const Index = ({ data }) => {
  const breadcrumbs = [
    {
      url: "/posts/",
      name: `${data.fighter.name}`,
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
            name={`"${data.fighter.name}"`}
          />
          <div className={style.sidebar}>
            <Ranking />
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
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/fighters/${id}?page=${page}`;
  const res = await fetch(requestUrl);
  const data = await res.json();

  return {
    props: data,
  };
};

export default Index;
