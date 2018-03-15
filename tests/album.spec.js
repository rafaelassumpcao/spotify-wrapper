//  getAlbum
//  getAlbums
//  getAlbumTracks

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import chai, { expect } from 'chai';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';


chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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
        it('should have getAlbum method', () => {
            expect(getAlbum).to.exist;
        });

        it('should have getAlbums method', () => {
            expect(getAlbums).to.exist;
        });

        it('should have getAlbumTracks', () => {
            expect(getAlbumTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        it('should call fetch function', () => {
            const albums = getAlbum();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

            const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
            expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk')
        });

        it('should return de correct data from Promise', () => {
            promise.resolves({ album : 'name'});
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(album.resolveValue).to.be.eql({album : 'name'});
        });
    });

    describe('getAlbums', () => {
        it('should call fetch function', () => {
            const albums = getAlbums('0TnOYISbd1XYRBk9myaseg');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with correct URL', () => {
            const albums = getAlbums('0TnOYISbd1XYRBk9myaseg');
            expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/albums?ids=0TnOYISbd1XYRBk9myaseg')

            const albums2 = getAlbums('4aawyAB9vmqN3uQ7FjRGTy');
            expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTy')

            const multipleAlbums = getAlbums(['0TnOYISbd1XYRBk9myaseg','4aawyAB9vmqN3uQ7FjRGTy']);
            expect(fetchedStub).to.have.been
                .calledWith('https://api.spotify.com/v1/albums?ids=0TnOYISbd1XYRBk9myaseg,4aawyAB9vmqN3uQ7FjRGTy')
        });

        it('should return a json from Promise', () => {
            promise.resolves({albums : 'names'});
            const albums = getAlbums('0TnOYISbd1XYRBk9myaseg');
            expect(albums.resolveValue).to.be.eql({albums : 'names'});
        });
    });

    describe('getAlbumTracks', () => {
        it('should call fetch function', () => {
            const incubusTrack = getAlbumTracks('0TnOYISbd1XYRBk9myaseg');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('shoudl call fetch with correct URL', () => {
            const tracks = getAlbumTracks('0TnOYISbd1XYRBk9myaseg');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0TnOYISbd1XYRBk9myaseg/tracks');

            const anotherTrack = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks')
        });

        it('should return a json from promise', () => {
            promise.resolves({'tracks': {1:  "Hola"}});
            const tracks = getAlbumTracks('0TnOYISbd1XYRBk9myaseg');
            expect(tracks.resolveValue).to.be.deep.equals({'tracks': {1:  "Hola"}});
        });
    });
});