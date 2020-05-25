const logger = require('./logging_config');
const Querier = require('./Querier');

/** Class that coordinates requests */
class Coordinator {
  /**
   * Process a request
   * @param {Request} request
   * @return {Promise<Response>}
   */
  static async processRequest(request) {
    if (Coordinator.validateRequest(request)) {
      logger.info('Recieved Valid Request: ' + JSON.stringify(request));
      return Querier.processRequest(request);
    } else {
      logger.info('Recieved Invalid Request: ' + JSON.stringify(request));
      return Promise.reject(new Error('Invalid Request'));
    }
  }

  /**
   * Validate a request
   * @param {Request} request
   * @return {boolean} Wether or not the request is valid
   */
  static validateRequest(request) {
    if (request.url.includes('badword')) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Coordinator;
