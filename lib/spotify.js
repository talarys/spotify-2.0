import SpotifyWebApi from 'spotify-web-api-node/src/spotify-web-api';

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-private',
  'user-follow-read',
  'streaming',
  'user-read-playback-position',
  'user-read-email',
  'playlist-read-private',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-currently-playing',
];

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

export { LOGIN_URL };
export default spotifyApi;
