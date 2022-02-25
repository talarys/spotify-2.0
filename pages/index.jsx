import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';

export default function Home() {
  return (
    <div>
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
          {/* Player */}
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
