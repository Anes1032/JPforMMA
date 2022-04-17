import Link from "next/link";
import style from "~/components/common/Breadcrumbs/index.module.scss";

const Breadcrumbs = (data) => {
  const breadcrumbs = data.data;
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.item}>
          <Link href={"/"}>
            <a className={style.link}>Top</a>
          </Link>
        </div>
        {breadcrumbs.map((item, i) => (
          <div key={i} className={style.item}>
            <span className={style.arrow}>&gt;</span>
            {breadcrumbs.length !== i + 1 ? (
              <Link href={`${item.url}`}>
                <a className={style.link}>{item.name}</a>
              </Link>
            ) : (
              <p className={style.link}>{item.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
