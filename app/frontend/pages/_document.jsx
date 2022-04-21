import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "~/lib/gtag";

export default class MyDocument extends Document {
  // Google Analytics グローバルサイトタグ
  // See: https://developers.google.com/analytics/devguides/collection/gtagjs#install_the_global_site_tag
  renderGtagSnippet() {
    if (!GA_TRACKING_ID) return;

    return (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </>
    );
  }

  render() {
    return (
      <Html lang="ja">
        <Head>{this.renderGtagSnippet()}</Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
              height="0"
              width="0"
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
