import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify 2.0</title>
      </Head>
      <div>
        <main>
          <Sidebar />
          {/* Center */}
        </main>
        <div>
          {/* Player */}
        </div>
      </div>
    </div>
  );
}
