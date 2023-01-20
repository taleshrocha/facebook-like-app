import Head from "next/head";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import Feed from "../components/Feed";
import LeftBar from "../components/LeftBar";
import Conversations from "../components/Conversations";
import Modal from "../components/Modal";
import { ModalProvider } from "../contexts/ModalContext";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="bg-gray-100 h-full min-h-screen">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />
      {session && (
        <main className="grid grid-cols-3 max-w-full">
          <LeftBar />

          {session && (
            <ModalProvider>
              <Feed />
              <Modal />
            </ModalProvider>
          )}

          <Conversations />
        </main>
      )}
    </div>
  );
}
