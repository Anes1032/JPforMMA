import Layout from "~/components/common/Layout";
import Hero from "~/components/pages/index/Hero";
import New from "~/components/pages/index/New";
import Ranking from "~/components/pages/common/Ranking";
import Pickup from "~/components/pages/index/Pickup";
import Recommend from "~/components/pages/index/Recommend";
import Tags from "~/components/pages/common/Tags";
import style from "~/pages/index.module.scss"

const Index = (data) => {
  const posts = data.data
  console.log(posts)
  return (
    <Layout>
      <Hero 
        data={posts.hero}
      />
      <div className={style.content}>
        <div className={style.box} >
          <New 
            data={posts.news}
          />
          <Ranking />
        </div>
        <Pickup 
          data={posts.pickup}
        />
        <div className={style.box} >
          <Recommend
            data={posts.recommend}
          />
          <div>
            <Tags 
              name={"急上昇ワード"} 
              data={posts.tags}
              slug={"tags"}
            />
            <Tags 
              name={"人気UFCファイター"} 
              data={posts.fighters}
              slug={"fighters"}
            />
          </div>
        </div>
      </div>
      <p></p>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts/top`;
  const res = await fetch(requestUrl);
  const data = await res.json();

  return { 
    props: data 
  };
};

export default Index;
