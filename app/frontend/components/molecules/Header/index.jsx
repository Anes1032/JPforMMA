import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import classnames from "classnames";
import style from "~/components/molecules/Header/index.module.scss";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className={style.container}>
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
        <div className={style.btns}>
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
      </div>
    </div>
  );
};

export default Header;
