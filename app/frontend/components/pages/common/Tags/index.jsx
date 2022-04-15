import Link from "next/link"
import style from "~/components/pages/common/Tags/index.module.scss"

const Tags = ({
  name,
  data,
  slug
}) => {
  if(data.length === 0) return null;
  
  return (
    <div className={style.container}>
      <h2 className={style.title}>{name}</h2>
      <div className={style.items}>
        {data.map(item => 
          <Link href={`/${slug}/${item.id}`} key={item.id}>
            <a className={style.item}>{item.name}</a>
          </Link>
        )}
      </div>
    </div>

  )
}

export default Tags