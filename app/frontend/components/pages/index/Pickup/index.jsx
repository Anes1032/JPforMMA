import Link from "next/link";
import { getPostTime, omittedText } from "~/lib/util";
import style from "~/components/pages/index/Pickup/index.module.scss"

const Pickup = (data) => {
  const items = data.data.map(item => {
    return (
      <Link href={`/posts/${item.id}`} key={item.id}>
        <a className={style.item}>
          <span className={style.block}>
            <img
              className={style.image}
              src={item.image_url}
              alt={item.en_title}
            />
            <p className={style.title}>{item.en_title}</p>
          </span>
          <h3 className={style.description}>{omittedText(item.en_sub_title)}</h3>
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
    )
  })
  return (
    <div className={style.container} >
      <h2 className={style.title}>
        <span className={style.text}>Pick UP!</span>
      </h2>
      <div className={style.content}>
        {items}
      </div>
    </div>
  )
}

export default Pickup