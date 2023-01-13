import Head from "next/head";
import Header from "../components/Header";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main>
        {session && <h1>Session active {session.user}</h1>}
        <h1>Hello</h1>
        <button onClick={signIn}>Sign In</button>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widgets */}
      </main>
    </>
  );
}
