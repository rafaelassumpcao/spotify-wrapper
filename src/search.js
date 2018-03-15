import { SPOTIFY_API_KEY, API_URL } from './config';
import { toJSON } from "./utils";

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`,{
    method: 'GET',
    headers: {
      acept: 'application/json',
      authorization: `Bearer ${SPOTIFY_API_KEY}`
    }
  }).then(toJSON);

export const searchArtists = query => 
  search(query, 'artist');
export const searchAlbums = query => 
  search(query, 'album');
export const searchTracks = query => 
  search(query, 'track');
export const searchPlaylists = query => 
  search(query, 'playlist');
