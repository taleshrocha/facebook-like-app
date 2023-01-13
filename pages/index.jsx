import Head from "next/head";
import Header from "../components/Header";
import { signIn, useSession } from "next-auth/react";
import Feed from "../components/Feed";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="grid grid-cols-3 max-w-6xl">
        {/* Sidebar */}
        <Feed />
        {/* Widgets */}
      </main>
    </>
  );
}
