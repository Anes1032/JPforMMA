import Link from "next/link";
import style from "~/components/pages/posts/detail/BackLinks/index.module.scss";

const BackLinks = () => {
  return (
    <div className={style.container}>
      <Link href={"/"}>
        <a className={style.top}>TOPに戻る</a>
      </Link>
      <Link href={"/"}>
        <a className={style.posts}>新着記事一覧へ</a>
      </Link>
    </div>
  );
};

export default BackLinks;
