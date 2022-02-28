import { useSetRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { msToMinsAndSecs } from '../lib/time';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  return (
    <div
      className=" px-2 grid grid-cols-2 pl-2 rounded hover:bg-[#2A2A30] cursor-pointer text-gray-400"
      onClick={playSong}
    >

      <div className="flex items-center space-x-2">
        <p className="w-7">{order + 1}</p>
        <img
          className="h-12 w-12 p-1"
          src={track.album.images[0].url}
        />
        <div>
          <p className="w-44 lg:w-72 truncate font-semibold text-white">{track.name}</p>
          <p className="w-44 lg:w-72 truncate text-sm hover:text-white">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className=" hidden md:inline">{track.album.name}</p>
        <p>
          {msToMinsAndSecs(track.duration_ms)}
        </p>
      </div>

    </div>
  );
}

export default Song;
