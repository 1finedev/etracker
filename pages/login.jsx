import { useState } from "react";
import { getServerSession } from "../lib/authControllers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Auth, Button, FormInput, SocialLogin } from "../components";
import Link from "next/link";
import { useAlert } from "../Context/AlertContext";
import { LoginSchema } from "../components/FormSchemas";

const formData = {
  initialValues: {
    username: "",
    password: "",
  },
  fields: {
    username: {
      field: "username",
      placeholder: "Enter username",
      label: "Username",
      type: "text",
    },
    password: {
      field: "password",
      placeholder: "Enter password",
      label: "Password",
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
  const { addAlert } = useAlert();

  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, password } = values;

    addAlert({
      intent: "error",
      label: 'error',
    });

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);

    if (res.ok === true) {
      router.push("/timeline");
    } else {
      addAlert({
        intent: "error",
        label: res.error,
      });
    }
  };

  return (
    <Auth formSchema={LoginSchema} handleSubmit={handleSubmit}>
      <FormInput input={formData.fields.username} />
      <FormInput input={formData.fields.password} />
      <Link href={"/forgot-password"}>
        <a className="ml-auto underline underline-offset-2 text-sm font-medium hover:font-bold hover:text-primary">
          Forgot Password?
        </a>
      </Link>
      <div className="w-full flex flex-col items-center justify-center mt-[30px]">
        <Button
          size={"half"}
          type={"submit"}
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
      </div>

      <h6 className="text-center my-[20px]">Or Login With:</h6>
      <SocialLogin />
      <h5 className="mt-[50px] text-center">
        Don&apos;t have an account?{" "}
        <Link href={"/register"}>
          <span className="text-primary font-medium hover:font-bold">
            Register
          </span>
        </Link>
      </h5>
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
