import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';

import tw from 'tailwind-styled-components';

function Sidebar() {
  return (
    <div className="text-gray-500 p-5 border-r text-sm border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
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
        {/* {Playlists...} */}
        <PlaylistItem>Playlist Name...</PlaylistItem>
        <PlaylistItem>Playlist Name...</PlaylistItem>
        <PlaylistItem>Playlist Name...</PlaylistItem>
        <PlaylistItem>Playlist Name...</PlaylistItem>
        <PlaylistItem>Playlist Name...</PlaylistItem>
      </div>
    </div>
  );
}

export default Sidebar;

const Button = tw.button`
flex items-center space-x-2 hover:text-white
`;

const PlaylistItem = tw.p`
  cursor-pointer hover:text-white
`;
