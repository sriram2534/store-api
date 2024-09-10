const mongoose = require('mongoose')
const dbConnectionErrRes = function (err) {
    return {
        message: 'Unable to Connect to DB',
        errorCode: 40,
    }
}

mongoose.Promise = global.Promise
module.exports = function (options, callback) {
    if (
        global &&
        global.cachedConnection &&
        global.cachedConnection.readyState &&
        global.cachedConnection.readyState === 1
    ) {
        return
    } else {
        try {
            let connectionPromise = mongoose.connect(process.env.DB_CONNECTION_URL, {
                poolSize: options && options.poolSize ? options.poolSize : 2,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
                keepAlive: 120,
            })
            return connectionPromise
        } catch (error) {
            console.error(error)
            global.cachedConnection = null
            return callback(dbConnectionErrRes(error))
        }
    }
}
