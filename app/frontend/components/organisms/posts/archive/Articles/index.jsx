import Link from "next/link";
import { omittedText } from "~/lib/util";
import Infos from "~/components/atoms/Infos";
import Pagenation from "~/components/organisms/posts/archive/Pagination";
import style from "~/components/organisms/posts/archive/Articles/index.module.scss";

const Posts = ({ data, pagenations, name, path }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.text}>{name}</span>
      </h1>
      <div className={style.content}>
        <div className={style.inner}>
          {data.map((item) => (
            <Link href={`/posts/${item.id}`} key={item.id}>
              <a className={style.item}>
                <img
                  className={style.image}
                  src={item.image_url}
                  alt={item.ja_title}
                  width={260}
                  height={190}
                />
                <div className={style.block}>
                  <h2 className={style.item_title}>
                    {omittedText(item.ja_title, 50)}
                  </h2>
                  <p className={style.description}>
                    {omittedText(item.ja_sub_title, 100)}
                  </p>
                  <Infos status={item.status_id} date={item.post_time} />
                </div>
              </a>
            </Link>
          ))}
        </div>
        <Pagenation pagenations={pagenations} path={path} />
      </div>
    </div>
  );
};

export default Posts;
