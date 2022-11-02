export default function Home() {
  return (
    <></>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    redirect: {
      permanent: true,
      destination: "/timeline",
    },
  };
}
