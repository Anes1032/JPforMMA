import Api from "~/lib/api";
import Layout from "~/components/molecules/Layout";
import Hero from "~/components/organisms/index/Hero";
import New from "~/components/organisms/index/New";
import Ranking from "~/components/atoms/Ranking";
import Pickup from "~/components/organisms/index/Pickup";
import Recommend from "~/components/organisms/index/Recommend";
import Tags from "~/components/atoms/Tags";
import style from "~/pages/index.module.scss";

const Index = ({ data }) => {
  return (
    <Layout>
      <Hero data={data.hero} />
      <div className={style.content}>
        <div className={style.box}>
          <New data={data.news} />
          <Ranking data={data.rankings} />
        </div>
        <Pickup data={data.pickup} />
        <div className={style.box}>
          <Recommend data={data.recommend} />
          <div>
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

export const getServerSideProps = async () => {
  const data = new Api("top").getData();

  return {
    props: data,
  };
};

export default Index;
