import Link from "next/link";
import style from "~/components/organisms/posts/archive/Pagination/index.module.scss";

const Pagination = ({ pagenations, path }) => {
  const currentPage = pagenations.currentPage;
  const totalPage = Math.ceil(pagenations.totalCount / 10);
  const list = Array.from({ length: totalPage }, (_, i) => i + 1);
  const index = currentPage - 1;
  const pagination = [];
  const setIndex = (n) => {
    return n < 0 || n > totalPage - 1 ? -1 : n;
  };
  const length = 5;
  if (list && list.length > 0) {
    if (list.length < 5) pagination.push(...list);
    else {
      pagination.push(list[index]);
      for (let i = 1; pagination.length < length; i++) {
        if (list[setIndex(index - i)])
          pagination.unshift(list[setIndex(index - i)]);
        if (list[setIndex(index + i)])
          pagination.push(list[setIndex(index + i)]);
      }
    }
  }
  return totalPage !== 0 ? (
    <div className={style.container}>
      <div className={style.pagination}>
        {currentPage !== 1 && (
          <Link href={`${path}?page=${currentPage - 1}`}>
            <a className={style.prev}>&lt;</a>
          </Link>
        )}
        {pagination.map((page, i) => {
          const inner =
            page === currentPage ? (
              <span className={style.current} key={i}>
                {page}
              </span>
            ) : (
              <Link href={`${path}?page=${page}`} key={i}>
                <a className={style.able}>{page}</a>
              </Link>
            );
          return inner;
        })}
        {currentPage !== totalPage && (
          <Link href={`${path}?page=${currentPage - 1}`}>
            <a className={style.next}>&gt;</a>
          </Link>
        )}
      </div>
    </div>
  ) : null;
};

export default Pagination;
