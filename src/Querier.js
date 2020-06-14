const fetch = require('node-fetch');
const AbortController = require('abort-controller');
const config = require('config');
const logger = require('./logging_config');

/** Class that queries 3rd party data sources */
class Querier {
  /**
     * Handle a request
     * @param {Request} request
     * @return {Promise<Response>} The Response
     */
  static async processRequest(request) {
    return Querier.fetchWithTimeout(request, config.get('querier.timeout'));
  }

  /**
   * fetchWithTimeout
   * See this: https://javascript.info/fetch-abort
   * @param {Request} request
   * @param {number} timeoutMs
   * @return {Promise<Response | Error>} response
   */
  static async fetchWithTimeout(request, timeoutMs) {
    const controller = new AbortController();

    if (!request.params) request.params = {};

    request.params.signal = controller.signal;
    setTimeout(() => controller.abort(), timeoutMs);

    controller.signal.addEventListener('abort', () => {
      logger.error(new Error(
          `Request timed out. Timeout Timer: ${timeoutMs}. Request: 
          ${request}`));
    });

    const requestUrl = request.originalUrl.substr(1);
    console.log(`Querier: Fetching ${requestUrl}`);
    const fetchedResponse = fetch(requestUrl, request.params);
    console.log(`Querier: Received: ` + JSON.stringify(fetchedResponse));
    return fetchedResponse
  }
}

module.exports = Querier;
