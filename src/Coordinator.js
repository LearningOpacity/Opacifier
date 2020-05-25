const logger = require('./logging_config')
const Querier = require('./Querier')

/** Class that coordinates requests */
class Coordinator {
  /**
   * Process a request
   * @param {Request} request
   * @return {Promise<Response>}
   */
  static async processRequest (request) {
    return Coordinator.validateRequest(request)
      .then(() => {
        logger.info('Recieved Valid Request: ' + request.stringify())
        return Querier.processRequest(request)
      })
      .catch((error) => {
        logger.info('Recieved Invalid Request: ' + request.stringify())
        return Promise.reject(error)
      })
  }

  /**
   * Validate a request
   * @param {Request} request
   * @return {Promise} Wether or not the request is valid
   */
  static async validateRequest (request) {
    return new Promise((resolve, reject) => {
      if (!request.requestHost ||
        !request.httpRequest) {
        reject(new Error('Invalid request'))
      } else {
        resolve()
      }
    })
  }
}

module.exports = Coordinator
