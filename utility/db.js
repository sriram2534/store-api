const mongoose = require('mongoose')
const dbConnectionErrRes = function (err) {
    return {
        message: 'Unable to Connect to DB',
        errorCode: 40
    }
}

mongoose.Promise = global.Promise
module.exports = function(options, callback) {
    if(global && global.cachedConnection && global.cachedConnection.readyState && global.cachedConnection.readyState === 1) {
        return
    } else {
        console.log('No Connection Found. Creating connection')
        try {
            let connectionPromise = mongoose.connect(process.env.DB_CONNECTION_URL, {
                poolSize: (options && options.poolSize) ? options.poolSize : 2,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
                keepAlive: 120
            })
            connectionPromise.then(() => {
                if(mongoose.connection) {
                    let connection = mongoose.connection
                    console.log('Connection SUCCESS');
                    global.cachedConnection = connection;

                    connection.on('error', function (err) {
                        console.error('Mongoose default connection error: ', err);
                        global.cachedConnection = null;
                    });

                    connection.on('disconnected', function () {
                        console.log('Connection DISCONNECTED');
                        global.cachedConnection = null;
                    });

                    connection.on('close', function () {
                        console.log('Connection CLOSE');
                        global.cachedConnection = null;
                    });

                    process.on('SIGINT', function () {
                        console.log('Closing the connection before process exit');
                        connection.close(function () {
                            process.exit(0);
                        });
                    });
                }  else {
                    global.cachedConnection = null;
                }
            }, (reason) => {
                console.log('DB Connection FAILURE', reason);
                global.cachedConnection = null; //Retry connection during next call
                return callback(dbConnectionErrRes(reason));
            })
        } catch (error) {
            console.error(error);
            global.cachedConnection = null;
            return callback(dbConnectionErrRes(error));
        }
    }
}