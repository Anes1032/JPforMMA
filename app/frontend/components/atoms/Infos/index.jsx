import style from "~/components/atoms/Infos/index.module.scss";
import { getPostTime } from "~/lib/util";

const Infos = ({ status, date }) => {
  return (
    <span className={style.infos}>
      {status !== 1 && status && (
        <span className={style.status}>
          {status === 2 ? "非公開" : "確認待ち"}
        </span>
      )}
      {date && (
        <span className={style.time}>
          <img src={"/images/clock-grey.svg"} width={16} height={16} />
          {getPostTime(date)}
        </span>
      )}
    </span>
  );
};

export default Infos;
