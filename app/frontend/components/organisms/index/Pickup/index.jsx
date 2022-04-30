import Link from "next/link";
import Infos from "~/components/atoms/Infos";
import { omittedText } from "~/lib/util";
import style from "~/components/organisms/index/Pickup/index.module.scss";

const Pickup = ({ data }) => {
  const items = data.map((item) => {
    return (
      <Link href={`/posts/${item.id}`} key={item.id}>
        <a className={style.item}>
          <span className={style.block}>
            <img
              className={style.image}
              src={item.image_url}
              alt={item.ja_title}
            />
            <p className={style.title}>{item.ja_title}</p>
          </span>
          <h3 className={style.description}>
            {omittedText(item.ja_sub_title)}
          </h3>
          <Infos date={item.post_time} />
        </a>
      </Link>
    );
  });
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        <span className={style.text}>Pick UP!</span>
      </h2>
      <div className={style.content}>{items}</div>
    </div>
  );
};

export default Pickup;
