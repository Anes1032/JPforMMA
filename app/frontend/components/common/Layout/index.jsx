import Head from "next/head";
import Header from "~/components/common/Header";
import Footer from "~/components/common/Footer";

const Layout = ({
  children,
  title,
  description,
  canonical,
}) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/og-image.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="content-language" content="ja"></meta>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;