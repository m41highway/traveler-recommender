'use strict'

const chakram = require('chakram'),
    expect = chakram.expect;
const should = require('chai').should()
const Promise = require('Bluebird')
const app = require('../server/server');


describe('E2E Location', () => {
    before(() => {
        return Promise.coroutine(function* () {
            
            // delete data
            console.log('Purge data ...');

            let result = yield app.models.Location.destroyAll()
            console.log(result);
            // let data = yield chakram.get('http://0.0.0.0:3000/api/Locations')
            // data.forEach(function(location){
            //     console.log(location);
            //     let result = yield chakram.delete('http://0.0.0.0:3000/api/Locations/' + location.id)
            //     console.log(result);
            // })

            // add test location data
            let res = yield chakram.post('http://0.0.0.0:3000/api/Locations', {
                "cityCode": "kyoto",
                "locationCode": "kinkakuji",
                "tribes": [1, 0, 1, 0, 1, 1, 1, 1, 0, 1]
            },
                { headers: {} })
            res = yield chakram.post('http://0.0.0.0:3000/api/Locations', {
                "cityCode": "kyoto",
                "locationCode": "kiyomizudera",
                "tribes": [0, 0, 0, 0, 1, 0, 1, 1, 1, 1]
            },
                { headers: {} })

            res = yield chakram.post('http://0.0.0.0:3000/api/Locations', {
                "cityCode": "kyoto",
                "locationCode": "fushimi-inari-shrine",
                "tribes": [0, 1, 0, 1, 0, 0, 0, 0, 1, 1]
            },
                { headers: {} })

            res = yield chakram.post('http://0.0.0.0:3000/api/Locations', {
                "cityCode": "osaka",
                "locationCode": "universial-studio",
                "tribes": [0, 1, 1, 0, 0, 0, 1, 0, 0, 0]
            },
                { headers: {} })

        })();
    })

    it('should get all the locations', () => {
        return Promise.coroutine(function* () {
            let res = yield chakram.get('http://0.0.0.0:3000/api/Locations')
            console.log('all');
            console.log(res.body);
            res.body.should.not.to.be.empty;
            expect(res.body.length).to.have.length.equal(4)
            expect(res.body).to.be.instanceof(Array)

        })();
    })

    it('should get all locations by city', () => {
        return Promise.coroutine(function* () {
            let res = yield chakram.get('http://0.0.0.0:3000/api/Locations/city?cityCode=kyoto')
            // console.log('by city');
            // console.log(res.body);
            expect(res.body.locations.length).to.have.length.equal(3)
            expect(res.body.locations).to.be.instanceof(Array)

        })();
    })

    it('should get array of recommendation order by score desc', () => {
        return Promise.coroutine(function* () {
            let recommendation = yield chakram.get('http://0.0.0.0:3000/api/Locations/recommend?cityCode=kyoto&travelerId=alan.fan')
            
            console.log(recommendation.body);

            expect(recommendation.body.recommendation).to.be.instanceof(Array)
            expect(recommendation.body.recommendation.length).to.have.length.equal(3)


        })();
    })
})