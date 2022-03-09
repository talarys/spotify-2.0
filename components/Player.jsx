import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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

import { debounce } from 'lodash';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

function Player() {
  const songInfo = useSongInfo();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const errorHandler = (err) => {
    spotifyApi.getMyDevices()
      .then((data) => {
        if (!data.body.devices.length) {
          toast.error('No devices found');
        } else {
          console.error(err);
        }
      })
      .catch((error) => console.error(error));
  };

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

  const debouncedAdjustVolume = useCallback(
    debounce((vol) => {
      spotifyApi.setVolume(vol)
        .catch((err) => errorHandler(err));
    }, 500),
  );

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const nextSong = () => spotifyApi.skipToNext()
    .catch((err) => errorHandler(err));

  const prevSong = () => spotifyApi.skipToPrevious()
    .catch((err) => errorHandler(err));

  const toggleShuffle = () => {
    if (shuffle) {
      spotifyApi.setShuffle(false)
        .then(setShuffle(false))
        .catch((err) => errorHandler(err));
    } else {
      spotifyApi.setShuffle(true)
        .then(setShuffle(true))
        .catch((err) => errorHandler(err));
    }
  };

  const toggleRepeat = () => {
    if (repeat) {
      spotifyApi.setRepeat('off')
        .then(setRepeat(false))
        .catch((err) => errorHandler(err));
    } else {
      spotifyApi.setRepeat('context')
        .then(setRepeat(true))
        .catch((err) => errorHandler(err));
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      spotifyApi.pause()
        .then(setIsPlaying(false))
        .catch((err) => errorHandler(err));
    } else {
      spotifyApi.play()
        .then(setIsPlaying(true))
        .catch((err) => errorHandler(err));
    }
  };

  return (
    <div className="space-y-2 p-4 grid sm:grid-cols-2 md:grid-cols-3 bg-[#181818] text-gray-300 w-screen absolute bottom-0">

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
        <SwitchHorizontalIcon
          onClick={toggleShuffle}
          className={`button ${shuffle && 'text-green-400'}`}
        />
        <RewindIcon
          onClick={prevSong}
          className="button"
        />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="button w-14 h-14"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="button w-14 h-14"
          />
        )}
        <FastForwardIcon onClick={nextSong} className="button" />
        <RefreshIcon
          onClick={toggleRepeat}
          className={`button ${repeat && 'text-green-400'}`}
        />
      </div>

      {/* Right */}
      <div className="hidden md:flex items-center justify-end space-x-3">
        <VolumeOffIcon onClick={() => setVolume(0)} className="button" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon onClick={() => setVolume(100)} className="button" />
      </div>
    </div>
  );
}

export default Player;
