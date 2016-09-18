'use strict'

const chakram = require('chakram'),
    expect = chakram.expect;
const should = require('chai').should()
const Promise = require('Bluebird')

describe('E2E', () => {
    before(() => {
        return Promise.coroutine(function* () {
            // add test data
            let addTraveler = yield chakram.post('http://0.0.0.0:3000/api/Travelers', {
                "travelerId": "alan.fan",
                "perferences": [0, 1, 0, 0, 0, 1, 1, 1, 0, 0]
            },
                { headers: {} })

            addTraveler = yield chakram.post('http://0.0.0.0:3000/api/Travelers', {
                "travelerId": "nick.tan",
                "perferences": [1, 1, 1, 0, 0, 1, 0, 0, 1, 1]
            },
                { headers: {} })
        })();
    })

    it('should get a specific traveler', () => {
        return Promise.coroutine(function* () {

            let userName = 'alan.fan'

            let res = yield chakram.post('http://0.0.0.0:3000/api/Travelers/perferences', {
                'travelerId': userName
            },
                { headers: {} })

            expect(res).should.exist
            res.body.traveler.travelerId.should.equal(userName)

        })();
    })

    it('should accept to ', () => {

    })
})