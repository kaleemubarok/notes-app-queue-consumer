/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = { text: 'SELECT p.id, p.name FROM playlists p WHERE p.id = $1', values: [playlistId] };
    const result = await this._pool.query(query);
    // if (!result.rows.length) {
    //   throw new NotFoundError('Playlist tidak ditemukan');
    // }
    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      // eslint-disable-next-line max-len
      text: 'SELECT s.id, s.title, s.performer FROM songs s INNER JOIN playlist_songs ps ON s.id = ps.song_id INNER JOIN playlists p ON p.id = ps.playlist_id WHERE p.id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    // if (!result.rows.length) {
    //   throw new NotFoundError('Lagu playlist tidak ditemukan');
    // }
    return result.rows;
  }
}

module.exports = PlaylistsService;
