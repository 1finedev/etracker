import { useState } from "react";
import { useRouter } from "next/router";
import { Auth, Button, FormInput, SocialLogin } from "../components";
import Link from "next/link";
import { useAlert } from "../Context/AlertContext";

const formData = {
  initialValues: {
    username: "",
    displayName: "",
    password: "",
  },
  fields: {
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
      type: "password",
    },
    passwordConfirm: {
      field: "passwordConfirm",
      placeholder: "Enter password again",
      label: "confirm Password",
      type: "password",
    },
  },
  validateForm: {
    username: (value) => {
      if (!value || value.trim() === "") return "Username is required!";
      if (value.length < 2) return "Username is too short!";
      if (value.length > 20) return "Username is too long!";
    },
    displayName: (value) => {
      if (!value || value.trim() === "") return "Display name is required!";
      if (value.length > 40) return "Display name is too long!";
    },
    password: (value) => {
      if (!value || value.trim() === "") return "Password is required!";
      if (value.length < 6) return "Password is too short";
    },
    passwordConfirm: (value) => {
      // password confirmation validation
    },
  },
};

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addAlert } = useAlert();

  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, displayName, password, passwordConfirm } = values;
  };

  return (
    <Auth formData={formData} handleSubmit={handleSubmit}>
      <FormInput input={formData.fields.username} />
      <FormInput input={formData.fields.displayName} />
      <FormInput input={formData.fields.password} />
      <FormInput input={formData.fields.passwordConfirm} />
      <Link href={"/forgot-password"}>
        <a className="ml-auto underline underline-offset-2 text-sm font-medium hover:font-bold hover:text-primary">
          Forgot Password?
        </a>
      </Link>
      <div className="w-full flex flex-col items-center justify-center mt-[20px]">
        <Button
          size={"half"}
          type={"submit"}
          loading={loading}
          disabled={loading}
        >
          Register
        </Button>
      </div>

      <h6 className="text-center my-[10px]">Or Register With:</h6>
      <SocialLogin />

      <h5 className="mt-[20px] text-center">
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
