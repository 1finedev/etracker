import Image from "next/image";
import Form from "../../Form";
import { useRouter } from "next/router";

const Auth = ({ formData, handleSubmit, className, children }) => {
  const router = useRouter();

  return (
    <div
      className={`${
        router.pathname === "/register" ? " py-[25px]" : "py-[50px]"
      } w-full h-screen bg-white px-[20px]`}
    >
      <div className="flex flex-col justify-center mb-[30px]">
        <Image src={"/Logo.svg"} alt="logo" width={64} height={64} />
        <h5 className="text-center mt-1">
          {router.pathname === "/register" ? "Join" : null} SoroSoke NG
        </h5>
      </div>
      <Form
        formData={formData}
        onSubmit={handleSubmit}
        className={`${className} flex flex-col gap-4`}
      >
        {children}
      </Form>
    </div>
  );
};

export default Auth;
