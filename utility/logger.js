const bunyan = require('bunyan')

let initLogger = function (event, context) {
  let requestId = ''

  if (event) {
    if (event.requestContext && event.requestContext.requestId) {
      requestId = event.requestContext.requestId
    } else if (event.body && event.body.request_id) {
      requestId = event.body.request_id
    }
  }

  let contextId = context && context.awsRequestId ? context.awsRequestId : ''
  let name = process.env.LAMBDA ? process.env.LAMBDA : 'default'
  let logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'INFO'

  return bunyan.createLogger({
    name: name,
    level: logLevel,
    serviceID: contextId,
    requestID: requestId,
  })
}

module.exports = { initLogger }
