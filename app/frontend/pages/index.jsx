import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Hero from "~/components/organisms/index/Hero";
import New from "~/components/organisms/index/New";
import Ranking from "~/components/atoms/Ranking";
import Pickup from "~/components/organisms/index/Pickup";
import Recommend from "~/components/organisms/index/Recommend";
import Tags from "~/components/atoms/Tags";
import style from "~/pages/index.module.scss";

const Index = ({ data }) => {
  const title =
    "JP PORTAL for UFC｜本場のUFCの情報・ニュースをお届けするメディア";
  const description =
    "日本語では読むことのできない本場のUFC情報をお届けします。日本人選手や有名スター選手の情報だけでなく、全ての情報を取り入れたい格闘技マニアのためのサイトです。";
  const canonical = buildCanonical();
  return (
    <Layout title={title} description={description} canonical={canonical}>
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
