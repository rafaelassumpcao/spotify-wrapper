/* global describe */
/* global beforeEach */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

    //search (generico) podendo buscar por mais + 1 tipo
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

  });
  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      
    });


    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artist = search('Muse', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
  
        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
      }); 

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      });
    });

    it('should return the json data from the promise', () => {
      promise.resolves({body : 'json'});
      const artists = search('Incubus', 'artist');
      //eql is deep equal
      expect(artists.resolveValue).to.be.eql({body : 'json'})
    });

  });

  describe('SearchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const incubusArtist = searchArtists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const museArtists = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
      
    });
  });

  describe('SearchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const incubusAlbums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const museAlbums = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
      
    });
  });

  describe('SearchTracks', () => {
    it('should call fetch function', () => {
      const incubusTracks = searchTracks('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const incubusTracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const museTracks = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
      
    });
  });

  describe('SearchPlaylists', () => {
    it('should call fetch function', () => {
      const incubusPlaylists = searchPlaylists('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const incubusPlaylist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const musePlaylist = searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
      
    });
  });

});
