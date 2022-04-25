import { useRouter } from "next/router";
import Link from "next/link";
import { getCsrfToken, getSession } from "next-auth/react";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/user/login/index.module.scss";

const Login = ({ csrfToken }) => {
  const { error } = useRouter().query;

  const title = "ログイン｜JP PORTAL for UFC";
  const canonical = buildCanonical("user", "login");

  return (
    <Layout title={title} canonical={canonical}>
      <div className={style.container}>
        <div className={style.content}>
          <h1 className={style.title}>ログイン</h1>
          <form
            className={style.form}
            method={"post"}
            action={"/api/auth/callback/credentials"}
          >
            <input
              name={"csrfToken"}
              type={"hidden"}
              defaultValue={csrfToken}
            />
            <div className={style.block}>
              <label className={style.label}>メールアドレス</label>
              <input className={style.input} name={"email"} />
            </div>
            <div className={style.block}>
              <label className={style.label}>パスワード</label>
              <input
                className={style.input}
                name={"password"}
                type={"password"}
              />
            </div>
            <div className={style.btn}>
              <button className={style.text} type="submit">
                ログイン
              </button>
            </div>
            {error && (
              <p className={style.error_message}>
                ログインメールアドレス又はパスワードが間違っています。
              </p>
            )}
            <Link href={"/user/new"}>
              <a className={style.link}>新規会員登録はこちらから</a>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        statusCode: 301,
        destination: "/",
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default Login;
