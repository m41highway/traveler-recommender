'use strict'

const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Promise = require('bluebird')
const similarity = require('./similarity')


describe('Similarity unit test', () => {

    it('should return a list of recommended location', () => {
        return Promise.coroutine(function* () {

            let locations = [
                { 'cityCode': 'kyoto', 'locationCode': 'fushimi-inari-shrine', tribes: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'kinkakuji', tribes: [1, 0, 1, 0, 1, 1, 1, 1, 0, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'kiyomizudera', tribes: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'location4', tribes: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0] },
                { 'cityCode': 'kyoto', 'locationCode': 'location5', tribes: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0] }
            ]

            let traveler = {
                "travelerId": "nick.tan",
                "perferences": [1, 1, 1, 0, 0, 1, 0, 0, 1, 0]
            }

            let topN = 3

            let recommendation = yield similarity.recommend(locations, traveler, topN)

            expect(recommendation).to.be.instanceof(Array)
            expect(recommendation.length).to.have.length.equal(topN)
        })();
    })

    it('should return error if locations is not array', () => {
        return Promise.coroutine(function* () {
            try {
                let locations = {}
                let res = yield similarity.recommend(locations, {}, 3)
            } catch (error) {
                expect(error).to.exist
                expect(error.name).to.equal('AssertionError')
                expect(error.message).to.equal('undefined (array) is required')
            }
        })();
    })

    it('should return error if locations is empty array', () => {
        return Promise.coroutine(function* () {
            try {
                let locations = []
                let res = yield similarity.recommend(locations, {}, 3)
            } catch (error) {
                expect(error.message).to.equal('The array is empty')
            }
        })();
    })

    it('should return error if traveler is not object', () => {
        return Promise.coroutine(function* () {
            try {
                let locations = [
                    { 'cityCode': 'kyoto', 'locationCode': 'fushimi-inari-shrine', tribes: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kinkakuji', tribes: [1, 0, 1, 0, 1, 1, 1, 1, 0, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kiyomizudera', tribes: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location4', tribes: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location5', tribes: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0] }
                ]

                let traveler = []

                let res = yield similarity.recommend(locations, traveler, 3)

            } catch (error) {
                expect(error).to.exist
                expect(error.name).to.equal('AssertionError')
                // expect(error.message).to.equal('undefined (array) is required')
            }
        })();
    })

    it('should return error if traveler perference is not an array', () => {
        return Promise.coroutine(function* () {
            try {
                let locations = [
                    { 'cityCode': 'kyoto', 'locationCode': 'fushimi-inari-shrine', tribes: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kinkakuji', tribes: [1, 0, 1, 0, 1, 1, 1, 1, 0, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kiyomizudera', tribes: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location4', tribes: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location5', tribes: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0] }
                ]

                let traveler = {
                    "travelerId": "nick.tan",
                    "perferences": {}
                }

                let topN = 3

                let recommendation = yield similarity.recommend(locations, traveler, topN)
            } catch (error) {
                expect(error).to.exist
                expect(error.name).to.equal('AssertionError')
                expect(error.message).to.equal('undefined (array) is required')
            }
        })();
    })

    it('should return error if traveler perferences is an empty array', () => {
        return Promise.coroutine(function* () {
            try {
                let locations = [
                    { 'cityCode': 'kyoto', 'locationCode': 'fushimi-inari-shrine', tribes: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kinkakuji', tribes: [1, 0, 1, 0, 1, 1, 1, 1, 0, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'kiyomizudera', tribes: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location4', tribes: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0] },
                    { 'cityCode': 'kyoto', 'locationCode': 'location5', tribes: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0] }
                ]

                let traveler = {
                    "travelerId": "nick.tan",
                    "perferences": []
                }

                let topN = 3

                let recommendation = yield similarity.recommend(locations, traveler, topN)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('The perferences array is empty')
            }
        })();
    })

    it('the number of recommended location will be overwritten (instead of topN) if the qualified recommended locatoin is less than topN', () => {
        return Promise.coroutine(function* () {
            let locations = [
                { 'cityCode': 'kyoto', 'locationCode': 'fushimi-inari-shrine', tribes: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'kinkakuji', tribes: [1, 0, 1, 0, 1, 1, 1, 1, 0, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'kiyomizudera', tribes: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1] },
                { 'cityCode': 'kyoto', 'locationCode': 'location4', tribes: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0] },
                { 'cityCode': 'kyoto', 'locationCode': 'location5', tribes: [1, 0, 0, 1, 1, 0, 0, 0, 0, 0] }
            ]

            let traveler = {
                "travelerId": "nick.tan",
                "perferences": [1, 1, 1, 0, 0, 1, 0, 0, 1, 0]
            }

            let topN = 10

            let recommendation = yield similarity.recommend(locations, traveler, topN)

            expect(recommendation).to.be.instanceof(Array)
            expect(recommendation.length).to.below(topN)
        })();
    })
})
