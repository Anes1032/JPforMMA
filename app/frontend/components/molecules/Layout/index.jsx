import Head from "next/head";
import Header from "~/components/molecules/Header";
import Footer from "~/components/molecules/Footer";
import OrganizationJsonLd from "~/components/JsonLd/Organization";

const Layout = ({
  children,
  title,
  description = "日本語では読むことのできない本場のUFC情報をお届けします。日本人選手や有名スター選手の情報だけでなく、全ての情報を取り入れたい格闘技マニアのためのサイトです。",
  canonical,
  ogp = "https://mma.jp-portal.com/images/og-image.png",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogp} />
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogp} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="content-language" content="ja"></meta>
        <link
          rel="shortcut icon"
          href="https://mma.jp-portal.com/images/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        ></link>
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <OrganizationJsonLd />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
