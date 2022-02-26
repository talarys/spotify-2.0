import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil';
import Link from 'next/link';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => setPlaylist(data.body))
        .catch((err) => console.log(err));
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <Link href="/login">
        <header className="absolute top-5 right-8">
          <div className="flex items-center space-x-1 bg-black opacity-80 hover:bg-gray-900  cursor-pointer rounded-full p-1 pr-2 border border-black">
            {session.user.image
              ? <img className="rounded-full w-6 h-6" src={session?.user.image} />
              : <UserCircleIcon className="w-6 h-6" />}
            <h2 className="font-semibold">
              {session?.user.name}
            </h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
      </Link>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 p-8`}>
        <img
          className="h-48 w-48 shadow-2xl"
          src={playlist?.images?.[0].url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>

    </div>
  );
}

export default Center;
