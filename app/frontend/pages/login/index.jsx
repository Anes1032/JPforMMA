import { useRouter } from "next/router";
import { getCsrfToken, signOut, useSession } from "next-auth/react";

const Login = ({ csrfToken }) => {
  const { error } = useRouter().query;
  const { data: session } = useSession();
  // const csrfToken = getCsrfToken()

  console.log(session);

  return (
    <div>
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      {!session && (
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            <div>ログインID</div>
            <input name="login" />
          </label>
          <label>
            <div>パスワード</div>
            <input name="password" type="password" />
          </label>
          <div>
            <button type="submit">ログイン</button>
          </div>
          {/* ログイン失敗後、エラーメッセージを表示。*/}
          {error && <div>ログインID又はパスワードが間違っています。</div>}
        </form>
      )}
    </div>
  );
};

// POSTリクエスト(サインイン・サインアウトなど)に必要なCSRFトークンを返却する。
export const getServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default Login;
