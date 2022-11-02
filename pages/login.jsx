import { getServerSession } from "../lib/authControllers";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // temp function for testing please change
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { username, password } = formEntries;

    const res = await signIn("credentials", {
      redirect: false,
      username: username.replace(/\s/g, "").trim(),
      password: password.trim(),
    });
    res.ok === true && router.push("/timeline");
    console.log(res);
  };

  return (
    <div>
      {/* just to test login and stuff you can delete */}
      <form onSubmit={handleSubmit} className="">
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/timeline",
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props if no session
  };
}
