import { useState } from "react";
import { getServerSession } from "../lib/authControllers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Auth, Button, FormInput, SocialLogin } from "../components";
import Link from "next/link";
import { useAlert } from "../Context/AlertContext";

const Login = () => {
  const router = useRouter();
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        type: showPassword ? "text" : "password",
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

  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, password } = values;

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
    <Auth formData={formData} handleSubmit={handleSubmit}>
      <FormInput input={formData.fields.username} />
      <FormInput
        input={formData.fields.password}
        icon={
          showPassword ? (
            <svg
              onClick={() => setShowPassword(!showPassword)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="3" y1="3" x2="21" y2="21"></line>
              <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
              <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
            </svg>
          ) : (
            <svg
              onClick={() => setShowPassword(!showPassword)}
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-eye"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
            </svg>
          )
        }
      />
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
