import Layout from "~/components/common/Layout";

const Index = (data) => {
  console.log(data.data);
  return (
    <Layout>
      <div>Hello World!!</div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
  const res = await fetch(requestUrl);
  const data = await res.json();

  return { props: { data } };
};

export default Index;
