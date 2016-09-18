'use strict'
const Promise = require('bluebird')
const assert = require('assert-plus')

const sim = require('compute-cosine-similarity')


module.exports.recommend = function (locations, traveler, topN) {
    
    assert.array(locations)

    if (locations.length === 0) throw Error('The array is empty')

    assert.object(traveler)

    assert.array(traveler.perferences)

    if (traveler.perferences.length === 0 ) throw Error('The perferences array is empty')

    return Promise.coroutine(function* () {

        let recommendation = []

        locations.forEach((location, index) => {

            let score = sim(location.tribes, traveler.perferences)

            recommendation.push(
                {
                    'locationCode': location.locationCode,
                    'score': score
                }
            )
        })

        recommendation.sort((a, b) => {
            return b.score - a.score
        })

        recommendation = recommendation.slice(0, topN) 
        
        return recommendation
    })();
}