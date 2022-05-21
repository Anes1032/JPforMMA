import Link from "next/link";
import style from "~/components/atoms/Banner/index.module.scss";

const Banner = ({ src, url }) => {
  return (
    <div className={style.container}>
      <Link href={url}>
        <a className={style.link}>
          <img
            className={style.image}
            src={`/images/${src}`}
            alt={"翻訳者募集"}
          />
        </a>
      </Link>
    </div>
  );
};

export default Banner;
