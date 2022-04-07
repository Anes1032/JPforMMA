
const Index = (data) => {
  console.log(data.data)
  return <div>Hello World!!</div>;
}


export const getServerSideProps = async () => {
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts` 
  const res = await fetch(requestUrl);
  const data = await res.json();

  return { props: { data } };
}

export default Index;