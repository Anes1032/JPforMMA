import Head from "next/head";

const ArticleJsonLd = ({ data }) => {
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mma.jp-portal.com/posts/${data.id}/`,
    },
    headline: data.en_title,
    image: [data.image_url],
    datePublished: data.created_at,
    dateModified: data.updated_at,
    author: {
      "@type": "Person",
      name: "JAPANPORTAL for UFC 編集部",
    },
    publisher: {
      "@type": "Organization",
      name: "JAPANPORTAL for UFC",
      logo: {
        "@type": "ImageObject",
        url: "https://mma.jp-portal.com/images/apple-touch-icon.png",
      },
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdConfigs) }}
      />
    </Head>
  );
};

export default ArticleJsonLd;
