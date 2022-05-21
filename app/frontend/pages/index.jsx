import Api from "~/lib/api";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import Hero from "~/components/organisms/index/Hero";
import Banner from "~/components/organisms/index/Banner";
import New from "~/components/organisms/index/New";
import Ranking from "~/components/atoms/Ranking";
import Pickup from "~/components/organisms/index/Pickup";
import Recommend from "~/components/organisms/index/Recommend";
import Tags from "~/components/atoms/Tags";
import style from "~/pages/index.module.scss";

const Index = ({ data }) => {
  const title =
    "JP PORTAL for UFC｜本場のUFCの情報・ニュースをお届けするメディア";
  const canonical = buildCanonical();
  return (
    <Layout title={title} canonical={canonical}>
      <Hero data={data.hero} />
      <Banner />
      <div className={style.content}>
        <div className={style.box}>
          <New data={data.news} />
          <Ranking data={data.rankings} />
        </div>
        <Pickup data={data.pickup} />
        <div className={style.box}>
          <Recommend data={data.recommend} />
          <div>
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

export const getServerSideProps = async () => {
  const options = {
    key: "top",
  };
  const data = await new Api(options).getData();

  return {
    props: {
      data: data.data,
    },
  };
};

export default Index;
