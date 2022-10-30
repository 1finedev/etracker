import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

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
        Logout
      </button>
    </div>
  );
};

export default Timeline;
