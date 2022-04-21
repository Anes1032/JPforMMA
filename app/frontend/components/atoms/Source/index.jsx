import Link from "next/link";
import style from "~/components/atoms/Source/index.module.scss";

const Source = ({ url, name }) => {
  return (
    <a
      href={url}
      className={style.link}
      target={"_blank"}
      rel="noopener, noreferrer"
    >
      {name}
    </a>
  );
};

export default Source;
