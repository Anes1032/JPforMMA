import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Api from "~/lib/api";

// credentials の情報から、ログイン可能か判定してユーザー情報を返す関数
const findUserByCredentials = async (credentials) => {
  const options = {
    key: "user_login",
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  };
  const data = await new Api(options).getData();
  if (data.status === "SUCCESS") {
    // ログイン可ならユーザー情報を返却
    return data.data;
  } else {
    // ログイン不可の場合は null を返却
    return null;
  }
};

// NextAuth に渡すオプション
const options = {
  // 認証プロバイダー
  providers: [
    CredentialsProvider({
      // 認証の関数
      authorize: async (credentials) => {
        const user = await findUserByCredentials(credentials);

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/user/login",
    error: "/user/login",
  },
  callbacks: {
    async redirect({ url }) {
      return url;
    },
  },
  secret: "secret",
};

export default (req, res) => NextAuth(req, res, options);
