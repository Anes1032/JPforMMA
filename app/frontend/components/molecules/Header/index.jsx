import Link from "next/link";
import style from "~/components/molecules/Header/index.module.scss";

const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <Link href={"/"}>
          <a>
            <img
              src="/images/header-logo.svg"
              width={392}
              height={78}
              alt={"JAPAN PORTAL for UFC"}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
