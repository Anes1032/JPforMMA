import Link from "next/link";
import Layout from "~/components/molecules/Layout";
import style from "~/pages/news/translaters/index.module.scss";

const Translaters = () => {
  const breadcrumbs = [
    {
      url: "/news/tramslaters/",
      name: "翻訳者募集",
    },
  ];
  const title = "翻訳者募集｜JAPAN PORTAL for UFC";
  const canonical = "/news/tramslaters/";
  return (
    <Layout title={title} canonical={canonical} breadcrumbs={breadcrumbs}>
      <div className={style.content}>
        <img
          src={"/images/translaters-thumbnail.png"}
          className={style.image}
        />
        <h1 className={style.title}>翻訳者募集</h1>
        <div className={style.main}>
          <p>
            本サイトの記事は全て管理者の翻訳作業によって作成されております。
          </p>
          <p>
            日本ではUFCやその他海外MMAの記事を見つけることが難しく、またあったとしても日本人に関連する記事のみとなっております。
          </p>
          <p>
            現状、生の情報を得るには海外の記事を探して、主に英語で読むしかないです。
          </p>
          <p>
            そこで本サイトを立ち上げたのですが、個人で翻訳作業を全てやるのは厳しく、ぜひ読者の皆様にもお手伝いをお願いしたいと考えております。
          </p>
          <p>
            本当のMMAファンが本当のMMA記事を読めるように助力していただけますと幸いです。
          </p>
          <p>
            下記ボタンより会員登録をして、ログインしていただきますと記事下の「記事を編集する」ボタンより記事の編集が可能になります。
          </p>
          <p>
            またログイン状態ですと、ヘッダー部分に非公開記事一覧へのリンクが現れますので、そちらより、現在非公開状態の記事一覧が確認できます。
          </p>
          <Link href={"/user/new/"}>
            <a className={style.link}>会員登録はこちらから</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Translaters;
