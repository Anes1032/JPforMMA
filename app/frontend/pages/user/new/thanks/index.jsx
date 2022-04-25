import Link from "next/link";
import { buildCanonical } from "~/lib/util";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/user/new/thanks/index.module.scss";

const Thanks = () => {
  const title = "新規会員登録ありがとうございます｜JP PORTAL for UFC";
  const canonical = buildCanonical("user", "new", "thanks");
  return (
    <Layout title={title} canonical={canonical}>
      <div className={style.container}>
        <div className={style.content}>
          <h1 className={style.title}>会員登録ありがとうございます</h1>
          <p className={style.text}>下記よりログイン完了してください</p>
          <Link href={"/user/login"}>
            <a className={style.btn}>
              <span className={style.text}>ログイン</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Thanks;
