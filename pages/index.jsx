import Head from "next/head";
import Header from "../components/Header";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main>
        {session && <h1>Session active for {session.user.name}</h1>}
        <button onClick={signIn}>Sign In</button>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widgets */}
      </main>
    </>
  );
}
