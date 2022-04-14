import Layout from "~/components/common/Layout";
import Hero from "~/components/pages/index/Hero";
import New from "~/components/pages/index/New";
import Ranking from "~/components/pages/index/Ranking";
import Pickup from "~/components/pages/index/Pickup";
import Recommend from "~/components/pages/index/Recommend";
import Tags from "~/components/pages/index/common/Tags";
import style from "~/pages/index.module.scss"

const Index = (data) => {
  const posts = data.data
  return (
    <Layout>
      <Hero 
        data={posts}
      />
      <div className={style.content}>
        <div className={style.box} >
          <New 
            data={posts}
          />
          <Ranking />
        </div>
        <Pickup 
          data={posts}
        />
        <div className={style.box} >
          <Recommend
            data={posts}
          />
          <div>
            <Tags name={"急上昇ワード"} />
            <Tags name={"人気UFCファイター"} />
          </div>
        </div>
      </div>
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
