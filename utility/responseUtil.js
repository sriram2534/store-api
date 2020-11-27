function createResponse(error, result, logger, callback) {
  let response = {}
  if (error) {
    if (logger) logger.error(error, 'HTTP 500 ERROR')
    response.statusCode = 500
    response.headers = {
      'Access-Control-Allow-Origin': '*',
    }
    response.body = JSON.stringify({
      message: 'Internal Server Error',
      details: error,
    })
  } else {
    if (logger) logger.info('HTTP 200 SUCCESS')
    response.statusCode = 200
    response.headers = {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
    response.body = JSON.stringify(result)
  }
  if (callback) {
    return callback(error, response)
  }
  return response
}

module.exports = { createResponse }
