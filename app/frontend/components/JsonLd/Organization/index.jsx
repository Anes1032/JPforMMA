import Head from "next/head";

const OrganizationJsonLd = () => {
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://mma.jp-portal.com/",
    logo: "https://mma.jp-portal.com/images/apple-touch-icon.png",
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

export default OrganizationJsonLd;
