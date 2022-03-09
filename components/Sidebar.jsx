import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';

import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import tw from 'tailwind-styled-components';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';

function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const setPlaylistId = useSetRecoilState(playlistIdState);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className=" text-gray-300 p-5 text-sm md:text-base pr-12 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide min-w-[12rem] max-w-[20rem] hidden sm:inline ">
      {/* Spotify Logo */}
      <img
        src="/spotify-logo.svg"
        className="w-36 h-16 mb-10"
      />
      <div className="space-y-4">
        <Button>
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </Button>
        <Button>
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </Button>
        <Button>
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <Button>
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </Button>
        <Button>
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </Button>
        <Button>
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

const Button = tw.button`
flex items-center space-x-2 hover:text-white
`;
