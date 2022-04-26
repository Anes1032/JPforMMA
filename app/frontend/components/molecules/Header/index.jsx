import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import classnames from "classnames";
import style from "~/components/molecules/Header/index.module.scss";

const Header = () => {
  const { data: session } = useSession();
  const [menuState, setMenuState] = useState(false);
  useEffect(() => {
    setMenuState(false);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.inner}>
          <Link href={"/"}>
            <a>
              <img
                className={style.image}
                src="/images/header-logo.svg"
                width={392}
                height={78}
                alt={"JAPAN PORTAL for UFC"}
              />
            </a>
          </Link>
          <div className={classnames(style.btns, "pcOnly")}>
            <Link href={"/posts/private"}>
              <a className={classnames(style.private, style.btn)}>非公開記事</a>
            </Link>
            <Link href={"/user/new"}>
              <a className={classnames(style.create, style.btn)}>会員登録</a>
            </Link>
            {session ? (
              <button
                className={classnames(style.signOut, style.btn)}
                onClick={() => signOut()}
              >
                ログアウト
              </button>
            ) : (
              <button
                className={classnames(style.signIn, style.btn)}
                onClick={() => signIn()}
              >
                ログイン
              </button>
            )}
          </div>
          <button
            onClick={() => setMenuState(!menuState)}
            className={classnames(style.hamburger, "spOnly")}
          >
            <span
              className={classnames(style.line, menuState ? style.open : "")}
            ></span>
            <span
              className={classnames(style.line, menuState ? style.open : "")}
            ></span>
            <span
              className={classnames(style.line, menuState ? style.open : "")}
            ></span>
          </button>
        </div>
      </div>
      {menuState && (
        <div className={style.menu}>
          <Link href={"/posts/private"}>
            <a className={classnames(style.private, style.btn)}>非公開記事</a>
          </Link>
          <Link href={"/user/new"}>
            <a className={classnames(style.create, style.btn)}>会員登録</a>
          </Link>
          {session ? (
            <button
              className={classnames(style.signOut, style.btn)}
              onClick={() => signOut()}
            >
              ログアウト
            </button>
          ) : (
            <button
              className={classnames(style.signIn, style.btn)}
              onClick={() => signIn()}
            >
              ログイン
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
