import Head from 'next/head'
import { FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from 'next/router';



export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const { push } = useRouter();
  console.log("session", session);
  if (session) {
      console.log("session", session);
      
      push("/");
  }
  
  return (
    <>

        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-700">
          <div className="w-1/3 backdrop-blur-sm bg-black/30 rounded-3xl py-12 flex flex-col justify-center items-center">
          <h1 className=" text-4xl text-white font-bold mb-8">Sign In</h1>

            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {/* <SignInBtn provider={btnDetails[provider.id === "google" ? "google" : provider.id === "discord" ? "discord" : "github"]} /> */}
                <SignInBtn provider={btnDetails[provider.id]} />
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

type  BTNdetail = {
  [key:string]:{
    name:string;
    icon:JSX.Element;
    color:string;   
  };
}
const btnDetails:BTNdetail = {
  google: {
    name: "google",
    icon: <FaGoogle className="mr-2" />,
    color: "bg-red-500 hover:bg-red-600",
  },
  discord: {
    name: "discord",
    icon: <FaDiscord className="mr-2" />,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  github: {
    name: "github",
    icon: <FaGithub className="mr-2" />,
    color: "bg-gray-800 hover:bg-gray-900",
  },
};




const SignInBtn: React.FC<{ provider: { name: string; icon: JSX.Element; color: string } }> = (props) => {
  const { provider } = props;
  return (<button onClick={() => signIn(provider.name, { callbackUrl: "/" })} className={`${provider.color} text-white font-semibold py-4 px-14 rounded-md shadow-md transition-colors duration-300 mb-4 flex items-center text-xl`}>
    {provider.icon}
    Sign in with {provider.name}
  </button>)
}



export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  }
}
