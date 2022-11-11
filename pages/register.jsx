import { useState } from "react";
import { useRouter } from "next/router";
import { Auth, Button, FormInput, SocialLogin } from "../components";
import Link from "next/link";
import { useAlert } from "../Context/AlertContext";
import { registerSchema } from "../components/Form/schemas";

const Register = () => {
  const router = useRouter();
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fields = {
    username: {
      field: "username",
      placeholder: "username",
      label: "Enter Username",
      type: "text",
    },
    displayName: {
      field: "displayName",
      placeholder: "display name",
      label: "Enter Display Name",
      type: "text",
    },
    password: {
      field: "password",
      placeholder: "password",
      label: "Enter Password",
      type: showPassword ? "text" : "password",
    },
    passwordConfirm: {
      field: "passwordConfirm",
      placeholder: "Enter password again",
      label: "confirm Password",
      type: showPassword ? "text" : "password",
    },
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, displayName, password, passwordConfirm } = values;
  };

  const PasswordInput = ({ input }) => (
    <FormInput
      input={input}
      icon={
        showPassword ? (
          <svg
            onClick={() => setShowPassword(!showPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
          </svg>
        )
      }
    />
  );

  return (
    <Auth formSchema={registerSchema} handleSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput input={fields.username} />
        <FormInput input={fields.displayName} />
        <PasswordInput input={fields.password} />
        <PasswordInput input={fields.passwordConfirm} />
      </div>
      <Link href={"/forgot-password"}>
        <a className="ml-auto underline underline-offset-2 text-sm font-medium hover:font-bold hover:text-primary">
          Forgot Password?
        </a>
      </Link>
      <div className="w-full flex flex-col items-center justify-center">
        <Button
          size={"half"}
          type={"submit"}
          loading={loading}
          disabled={loading}
        >
          Register
        </Button>
      </div>

      <h6 className="text-center">Or Register With:</h6>
      <SocialLogin />

      <h5 className="text-center">
        Already have an account?{" "}
        <Link href={"/login"}>
          <span className="text-primary font-medium hover:font-bold">
            Login
          </span>
        </Link>
      </h5>
    </Auth>
  );
};

export default Register;
