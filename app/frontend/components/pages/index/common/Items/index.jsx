import Link from "next/link";
import { getPostTime, omittedText } from "~/lib/util";
import style from "~/components/pages/index/common/Items/index.module.scss";

const Items = ({ data }) =>
  data.map((item) => (
    <Link href={`/posts/${item.id}`} key={item.id}>
      <a className={style.item}>
        <img className={style.image} src={item.image_url} alt={item.en_title} />
        <span className={style.block}>
          <h3 className={style.title}>{item.en_title}</h3>
          <p className={style.description}>
            {omittedText(item.en_sub_title, 200)}
          </p>
          <span className={style.infos}>
            {item.post_time && (
              <span className={style.time}>
                <img src={"/images/clock-grey.svg"} width={16} height={16} />
                {getPostTime(item.post_time)}
              </span>
            )}
          </span>
        </span>
      </a>
    </Link>
  ));

export default Items;
