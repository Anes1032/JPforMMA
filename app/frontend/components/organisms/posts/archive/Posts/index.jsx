import Link from "next/link";
import { omittedText } from "~/lib/util";
import Infos from "~/components/atoms/Infos";
import Pagenation from "~/components/organisms/posts/archive/Pagination";
import style from "~/components/organisms/posts/archive/Posts/index.module.scss";

const Posts = ({ data, pagenations, name }) => {
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
                  alt={item.en_title}
                  width={260}
                  height={190}
                />
                <h2 className={style.item_title}>
                  {omittedText(item.en_title, 50)}
                </h2>
                <Infos date={item.post_time} />
              </a>
            </Link>
          ))}
        </div>
        <Pagenation pagenations={pagenations} />
      </div>
    </div>
  );
};

export default Posts;
