import Image from "next/image";
import Form from "../../Form";
import { useRouter } from "next/router";
import Card from "../../Card";

const Auth = ({ formSchema, handleSubmit, className, children }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 items-center h-screen">
      <div className="absolute top-0 left-0 h-screen w-full -z-10 brightness-50">
        <Image src={'/auth.webp'} objectFit="cover" layout="fill" />
      </div>

      <div className="bg-white/20 w-2/3 p-4 text-white space-y-4 rounded-md mx-auto">
        <h1 className="text-4xl font-semibold">Lorem Ipsum</h1>
        <p className="text-xl">You have been waiting for your chance to be heard. Finally, you have a voice.</p>
      </div>

      <Card flexDisplay='col' spacing='compact' className='w-4/5'>
        <div
          className="flex flex-col justify-center"
          onClick={() => router.push("/")}
        >
          <div className="flex flex-col">
            <Image src={"/Logo.svg"} alt="logo" width={48} height={48} priority />
            <h5 className="text-center font-semibold mt-1 text-primary text-sm">
              SoroSoke NG
            </h5>

          </div>
        </div>
        <Form
          schema={formSchema}
          onSubmit={handleSubmit}
          className={`${className} flex flex-col gap-4`}
        >
          {children}
        </Form>
      </Card>
    </div>
  );
};

export default Auth;
