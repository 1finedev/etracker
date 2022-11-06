import { useState } from "react";
import { getServerSession } from "../lib/authControllers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Auth, Button, FormInput } from "../components";
import Link from "next/link";

const formData = {
  initialValues: {
    username: "",
    password: "",
  },
  fields: {
    username: {
      field: "username",
      placeholder: "username",
      label: "Enter username",
      type: "text",
    },
    password: {
      field: "password",
      placeholder: "password",
      label: "Enter password",
      type: "password",
    },
  },
  validateForm: {
    username: (value) => {
      if (!value || value.trim() === "") return "Username is required";
    },
    password: (value) => {
      if (!value || value.trim() === "") return "Password is required";
      if (value.length < 6) return "Password is too short";
    },
  },
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, password } = values;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);
    res.ok === true && router.push("/timeline");
    console.log(res);
  };

  return (
    <Auth formData={formData} handleSubmit={handleSubmit}>
      <FormInput input={formData.fields.username} />
      <FormInput input={formData.fields.password} />

      <Link href={"/forgot-password"}>
        <a className="ml-auto text-sm font-medium hover:font-bold hover:text-primary">
          Forgot Password
        </a>
      </Link>

      <Button type={"submit"} loading={loading} disabled={loading}>
        Log in
      </Button>

      <div className="mt-[10px]">
        Don&apos;t have an account?{" "}
        <Link href={"register"}>
          <span className="text-primary font-medium hover:font-bold">
            Register
          </span>
        </Link>
      </div>
    </Auth>
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
    props: {}, // will be passed to the page component as props
  };
}
