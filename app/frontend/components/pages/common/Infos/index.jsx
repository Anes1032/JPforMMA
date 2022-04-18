import style from "~/components/pages/common/Infos/index.module.scss";
import { getPostTime } from "~/lib/util";

const Infos = ({ date }) => {
  return (
    <span className={style.infos}>
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
