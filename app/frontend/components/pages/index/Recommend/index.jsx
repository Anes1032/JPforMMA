import Items from "~/components/pages/index/common/Items";
import style from "~/components/pages/index/Recommend/index.module.scss";

const Recommend = ({ data }) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        <span className={style.text}>Reccomend</span>
      </h2>
      <div className={style.content}>
        <Items data={data} />
      </div>
    </div>
  );
};

export default Recommend;
