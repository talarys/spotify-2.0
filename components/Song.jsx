import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import useSpotify from '../hooks/useSpotify';
import { msToMinsAndSecs } from '../lib/time';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import 'react-toastify/dist/ReactToastify.css';

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  const playSong = () => {
    spotifyApi.getMyDevices()
      .then((data) => {
        if (!data.body.devices.length) {
          toast.error('No devices found');
        } else {
          setCurrentTrackId(track.id);
          setIsPlaying(true);
          spotifyApi.play({
            uris: [track.uri],
          }, (err) => !err || console.log(err));
        }
      }, (err) => {
        console.log('Something went wrong!', err);
      });
  };

  return (
    <div
      className="p-4 flex md:grid grid-cols-2 rounded hover:bg-[#2A2A30] cursor-pointer text-gray-400"
      onClick={playSong}
    >
      <div className="flex items-center space-x-2">
        <p className="pr-2">{order + 1}</p>
        <img
          className="h-16 w-16"
          src={track.album.images[0].url}
        />
        <div>
          <p className="pr-2 font-semibold text-white">{track.name}</p>
          <p className="text-sm hover:text-white">{track.artists[0].name}</p>
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
