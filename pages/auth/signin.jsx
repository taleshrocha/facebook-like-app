import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

function signin({ providers }) {
  return (
    <>
      <Image src="https://links.papareact.com/t4i" height={400} width={400} />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
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
