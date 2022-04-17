import Link from "next/link";
import { getPostTime, omittedText } from "~/lib/util";
import Pagenation from "~/components/pages/posts/archive/Pagination";
import style from "~/components/pages/posts/archive/Posts/index.module.scss";

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
                <span className={style.infos}>
                  {item.post_time && (
                    <span className={style.time}>
                      <img
                        src={"/images/clock-grey.svg"}
                        width={16}
                        height={16}
                      />
                      {getPostTime(item.post_time)}
                    </span>
                  )}
                </span>
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
