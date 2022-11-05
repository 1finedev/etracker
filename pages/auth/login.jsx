import { getServerSession } from "../../lib/authControllers";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Auth from "../../components/Layout/Auth";
import Link from "next/link";
import Button from "../../components/Button";
import FormInput from "../../components/Form/FormInput";

const formData = {
  initialValues: {
    username: '',
    password: ''
  },
  fields: {
    username: {
      field: 'username',
      placeholder: 'username',
      label: 'enter username',
      type: 'text'
    },
    password: {
      field: 'password',
      placeholder: 'password',
      label: 'enter password',
      type: 'password'
    }
  },
  validateForm: {
    username: (value) => {
      if (!value || value.trim() === '') return 'username is required';
    },
    password: (value) => {
      if (!value || value.trim() === '') return 'password is required';
      if (value.length < 6) return 'password is too short';
    }
  }
}

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // temp function for testing please change
  const handleSubmit = async (values) => {
    const { username, password } = values;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    res.ok === true && router.push("/timeline");
    console.log(res);
  };

  return (
    <Auth
      formData={formData}
      onSubmit={handleSubmit}
    >
      <FormInput input={formData.fields.username} />
      <FormInput input={formData.fields.password} />

      <Link href={'/forgotpassword'}>
        <a className="ml-auto text-sm font-medium hover:font-bold hover:text-primary">Forgot Password</a>
      </Link>

      <Button type={'submit'}>
        Log in
      </Button>

      <div>
        Don't have an account? <Link href={'register'}><span className="text-primary font-medium hover:font-bold">Register</span></Link>
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
