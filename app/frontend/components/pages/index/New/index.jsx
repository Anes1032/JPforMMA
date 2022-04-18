import Link from "next/link";
import Items from "~/components/pages/index/common/Items";
import style from "~/components/pages/index/New/index.module.scss";

const New = ({ data }) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        <span className={style.text}>News</span>
      </h2>
      <div className={style.readmore}>
        <Link href={"/posts/"}>
          <a className={style.link}>新着記事を見る＞＞</a>
        </Link>
      </div>
      <div className={style.content}>
        <Items data={data} />
      </div>
    </div>
  );
};

export default New;
