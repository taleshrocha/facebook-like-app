import Head from "next/head";
import Header from "../components/Header";
import { signIn, useSession } from "next-auth/react";
import Feed from "../components/Feed";
import LeftBar from "../components/LeftBar";
import Conversations from "../components/Conversations";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="grid grid-cols-3 max-w-full">
        {session && <LeftBar />}
        <Feed />
        <Conversations />
      </main>
    </div>
  );
}
