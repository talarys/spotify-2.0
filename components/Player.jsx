import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

function Player() {
  const songInfo = useSongInfo();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      if (!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack()
          .then((data) => setCurrentTrackId(data.body?.item?.album?.id));
        spotifyApi.getMyCurrentPlaybackState()
          .then((data) => setIsPlaying(data.body?.is_playing));
      }
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="bg-black text-gray-300 w-screen absolute bottom-0">
      <div>
        <img className="h-10 w-10" src={songInfo?.album?.images[0]?.url} alt="hello" />
      </div>
      <div>
        <h3>
          {songInfo?.name}
        </h3>
      </div>
    </div>
  );
}

export default Player;
