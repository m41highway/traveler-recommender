'use strict';

const Promise = require('bluebird');

module.exports = function (Traveler) {

    Traveler.getOne = (travelerId) => {
        return Promise.coroutine(function* () {
            try {
                let res = yield Traveler.find({ where: { travelerId: travelerId } })
                // let res = yield Traveler.findOne({})
                
                // assume only one record obtained
                console.log(res);
                return Promise.resolve(res[0])

            } catch (err) {
                console.log(err);
                return Promise.reject(err)
            }
        })();
    }

    Traveler.remoteMethod(
        'getOne',
        {
            accepts: { arg: 'travelerId', type: 'string' },
            returns: { arg: 'traveler', type: 'object' },
            // returns: [{ arg: 'travelerId', type: 'string' }, { arg: 'perferences', type: 'array' }],
            http: {
                verb: 'post', path: '/perferences'
            }
        }
    );
};
