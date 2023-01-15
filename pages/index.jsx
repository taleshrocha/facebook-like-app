import Head from "next/head";
import Header from "../components/Header";
import { signIn, useSession } from "next-auth/react";
import Feed from "../components/Feed";
import LeftBar from "../components/LeftBar";
import Conversations from "../components/Conversations";
import Modal from "../components/Modal";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      {session && (
        <main className="grid grid-cols-3 max-w-full">
          <LeftBar />
          <Feed />
          <Conversations />
        </main>
      )}

      <Modal />
    </div>
  );
}
