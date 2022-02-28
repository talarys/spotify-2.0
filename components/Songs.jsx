import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="px-8">
      <div className="text-white flex flex-col space-y-2 pb-28">
        {playlist?.tracks.items.map(({ track }, i) => (
          <Song key={track.id} track={track} order={i} />
        ))}
      </div>
    </div>
  );
}

export default Songs;
