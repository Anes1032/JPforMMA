import Link from "next/link";
import Infos from "~/components/atoms/Infos";
import { omittedText } from "~/lib/util";
import style from "~/components/atoms/Ranking/index.module.scss";

const Ranking = ({ data }) => {
  return (
    <div className={style.container}>
      <p className={style.title}>人気記事ランキング</p>
      <div className={style.content}>
        {data.map((item, i) => (
          <Link href={`/posts/${item.id}`} key={i}>
            <a className={style.item}>
              <p className={style.number}>{i + 1}</p>
              <img
                src={item.image_url}
                className={style.image}
                width={134}
                height={89}
              />
              <span className={style.block}>
                <p className={style.item_title}>
                  {omittedText(item.en_title, 80)}
                </p>
                <Infos date={item.post_time} />
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
