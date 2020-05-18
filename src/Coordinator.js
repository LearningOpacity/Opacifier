const logger = require('./logging_config');
const Querier = require('./Querier');

/** Class that coordinates requests */
class Coordinator {
  /**
   * Process a request
   * @param {Request} request
   * @return {Response}
   */
  static processRequest(request) {
    if (Coordinator.validateRequest(request)) {
      logger.info('Recieved Valid Request: ' + request.stringify());
      const response = Querier.processRequest(request);

      return response;
    } else {
      logger.info('Recieved Invalid Request: ' + request.stringify());
    }
  }

  /**
   *
   * @param {Request} request
   * @return {boolean} Wether or not the request is valid
   */
  static validateRequest(request) {
    return true;
  }
}

module.exports = Coordinator;
