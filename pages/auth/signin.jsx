import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";

function signin({ providers }) {
  return (
    <div>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="flex flex-col items-center space-y-6">
        <Image src="https://links.papareact.com/t4i" height={400} width={400} />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button 
              className="p-4 bg-blue-500 rounded-r-full rounded-l-full font-bold text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
