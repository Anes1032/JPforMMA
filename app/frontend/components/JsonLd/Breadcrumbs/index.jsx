import Head from "next/head";

const BreadcrumbsJsonLd = ({ breadcrumbs }) => {
  const items = breadcrumbs.map((item, i) => {
    return {
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      item: `https://mma.jp-portal.com${item.url}`,
    };
  });
  items.unshift({
    "@type": "ListItem",
    position: 1,
    name: "JAPANPORTAL for MMA ",
    item: "https://mma.jp-portal.com/",
  });
  const jsonLdConfigs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
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

export default BreadcrumbsJsonLd;
