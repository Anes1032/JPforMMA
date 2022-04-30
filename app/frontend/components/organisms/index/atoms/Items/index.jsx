import Link from "next/link";
import Infos from "~/components/atoms/Infos";
import { getPostTime, omittedText } from "~/lib/util";
import style from "~/components/organisms/index/atoms/Items/index.module.scss";

const Items = ({ data }) =>
  data.map((item) => (
    <Link href={`/posts/${item.id}`} key={item.id}>
      <a className={style.item}>
        <img className={style.image} src={item.image_url} alt={item.ja_title} />
        <span className={style.block}>
          <h3 className={style.title}>{item.ja_title}</h3>
          <p className={style.description}>
            {omittedText(item.ja_sub_title, 200)}
          </p>
          <Infos date={item.post_time} />
        </span>
      </a>
    </Link>
  ));

export default Items;
