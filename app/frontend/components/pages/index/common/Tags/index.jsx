import style from "~/components/pages/index/common/Tags/index.module.scss"

const Tags = ({
  name,
}) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{name}</h2>
      <div className={style.items}>
        <p className={style.item}>テスト</p>
        <p className={style.item}>テスト</p>
        <p className={style.item}>テスト</p>
        <p className={style.item}>テスト</p>
        <p className={style.item}>テスト</p>
        <p className={style.item}>テスト</p>
      </div>
    </div>

  )
}

export default Tags