import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import mockData from "./../../mockData.json";
import { useRef } from "react";
import { useEffect } from "react";

const Timeline = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session, status);

  const createPost = async () => {
    try {
      mockData.map(async (post) => {
        const response = await axios.post("/api/createPost", { ...post });
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postRef = useRef(false);
  useEffect(() => {
    if (!postRef.current) {
      postRef.current = true;
      createPost();
    }
  }, []);

  // show all posts as endless scroll page
  return (
    <div>
      <button
        onClick={async () => {
          const data = await signOut({ redirect: false, callbackUrl: "/" });
          router.push(data.url);
        }}
      >
        {session ? <>Logout</> : <>LogIn</>}
      </button>
      <button onClick={() => router.push({pathname: '/auth/register', query: {from: 'post'}})}>
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
