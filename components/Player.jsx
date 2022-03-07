import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import {
  SwitchHorizontalIcon,
  RefreshIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from '@heroicons/react/outline';
import {
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/solid';

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
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      if (!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          setCurrentTrackId(data.body?.item?.id);
        });
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      }
    }
  }, [currentTrackId, spotifyApi, session]);

  const nextSong = () => spotifyApi.skipToNext();
  const prevSong = () => spotifyApi.skipToPrevious();
  const toggleShuffle = () => {
    if (shuffle) {
      spotifyApi.setShuffle(false);
      setShuffle(false);
    } else {
      spotifyApi.setShuffle(true);
      setShuffle(true);
    }
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-4 grid grid-cols-3 bg-[#181818] text-gray-300 w-screen absolute bottom-0">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img className="h-20 w-20 ml-5 p" src={songInfo?.album?.images[0]?.url} />
        <div>
          <h3 className="font-bold text-lg">
            {songInfo?.name}
          </h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-center space-x-2">
        <SwitchHorizontalIcon onClick={toggleShuffle} className={`button ${shuffle && 'text-green-400'}`} />
        <RewindIcon onClick={prevSong} className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-14 h-14" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-14 h-14" />
        )}
        <FastForwardIcon onClick={nextSong} className="button" />
        <RefreshIcon className="button" />
      </div>
      {/* Right */}
      <div className="flex items-center justify-center space-x-3">
        <VolumeOffIcon className="button" />
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={50}
        />
        <VolumeUpIcon className="button" />
      </div>
    </div>
  );
}

export default Player;
