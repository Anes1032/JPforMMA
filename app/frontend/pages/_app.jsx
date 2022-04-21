import React from "react";
import { SessionProvider } from "next-auth/react";

import "~/styles/reset.css";
import "~/styles/globals.scss";
import "~/styles/slick.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
