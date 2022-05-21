import Link from "next/link";
import style from "~/components/organisms/index/Banner/index.module.scss";

const Banner = () => {
  return (
    <div className={style.container}>
      <Link href={"/news/translaters"}>
        <a className={style.link}>
          <img
            className={style.image}
            src={"/images/translaters-banner-large.png"}
            alt={"翻訳者募集"}
          />
        </a>
      </Link>
    </div>
  );
};

export default Banner;
