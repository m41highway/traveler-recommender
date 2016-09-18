'use strict'

const Promise = require('Bluebird')
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
                // To-do: call simialarity interface
                console.log(travelerId);
console.log(101);                
                let locationResponse = yield Location.find({ where: { cityCode: cityCode } })
console.log(102);
                console.log(locationResponse);


                // let travelerResponse = yield Traveler.find({ where: { travelerId: travelerId } })
                let travelerResponse = yield Location.app.models.Traveler.getOne(travelerId)
                console.log(travelerResponse);
console.log(103);
                let recommendation = yield similarity.recommend(locationResponse, travelerResponse, 3)
                console.log(recommendation);


                // loop location
                // sim(location, user)
                // sort out top 3 
                // return array of locations

                // assume an array of result
                // console.log(res);
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
