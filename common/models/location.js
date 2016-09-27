'use strict'

const Promise = require('bluebird')
// const Traveler = require('./traveler.js')
const similarity = require('../lib/similarity.js') 

module.exports = function (Location) {

    Location.getByCityCode = (cityCode) => {
        console.log('Triggerd get by city code');
        return Promise.coroutine(function* () {
            try {
                console.log('The criteria is ' + cityCode );
                let res = yield Location.find({ where: { cityCode: cityCode } })

                // assume an array of result
                console.log(res);
                return Promise.resolve(res)

            } catch (err) {
                console.log(err);
                return Promise.reject(err)
            }
        })();
    }

    Location.getPersonalisedRecommendation = (cityCode, travelerId) => {
        return Promise.coroutine(function* () {
            try {
                console.log(travelerId);
                let locationResponse = yield Location.find({ where: { cityCode: cityCode } })
                let travelerResponse = yield Location.app.models.Traveler.getOne(travelerId)
                let recommendation = yield similarity.recommend(locationResponse, travelerResponse, 3)                
                return Promise.resolve(recommendation)

            } catch (err) {
                console.log(err);
                return Promise.reject(err)
            }
        })();
    }

    Location.remoteMethod(
        'getByCityCode',
        {
            accepts: { arg: 'cityCode', type: 'string' },
            returns: { arg: 'locations', type: 'array' },
            http: {
                verb: 'get', path: '/city'
            }
        }
    )

    Location.remoteMethod(
        'getPersonalisedRecommendation', 
        {
            accepts: [
                { arg: 'cityCode', type: 'string' },
                { arg: 'travelerId', type: 'string' }
            ],
            returns: { arg: 'recommendation', type: 'array' },
            http: {
                verb: 'get', path: '/recommend'
            }
        }
    )
};
