import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "../../lib/authControllers";

const Timeline = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session, status);
  // show all posts as endless scroll page
  return (
    <div>
      <button
        onClick={async () => {
          const data = await signOut({ redirect: false, callbackUrl: "/" });
          router.push(data.url);
        }}
      >
        {session ?
          <>Logout</>
          :
          <>LogIn</>
        }
      </button>
      <button onClick={() => router.push({pathname: '/register', query: {from: 'post'}})}>
        Test
      </button>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Timeline;
