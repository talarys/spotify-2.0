import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/spotify.svg" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div>
          <Player />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
