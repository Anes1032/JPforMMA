import { useRouter } from "next/router";
import Link from "next/link";
import { getCsrfToken, getSession } from "next-auth/react";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/user/login/index.module.scss";

const Login = ({ csrfToken }) => {
  const items = [
    {
      name: "メールアドレス",
      key: "email",
      type: "email",
    },
    {
      name: "パスワード",
      key: "password",
      type: "password",
    },
  ];
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
            {items.map((item) => (
              <div key={item.key} className={style.block}>
                <div className={style.inner}>
                  <label className={style.label}>{item.name}</label>
                  <input
                    className={style.input}
                    name={item.key}
                    type={item.type}
                  />
                </div>
              </div>
            ))}
            <div className={style.btn}>
              <button className={style.text} type="submit">
                ログイン
              </button>
            </div>
            {error && (
              <p className={style.error_message}>
                メールアドレス又はパスワードが間違っています。
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
