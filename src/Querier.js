const fetch = require('node-fetch');
const AbortController = require('abort-controller');

/** Class that queries 3rd party data sources */
class Querier {
  /**
     * Handle a request
     * @param {Request} request
     * @return {Promise<Response>} The Response
     */
  static async processRequest(request) {
    return Querier.fetchWithTimeout(request, 2000);
  }

  /**
   * fetchWithTimeout
   * See this: https://javascript.info/fetch-abort
   * @param {Request} request
   * @param {number} timeoutMs
   * @return {Promise<Response>} response
   */
  static async fetchWithTimeout(request, timeoutMs) {
    const controller = new AbortController();

    if (!request.params) request.params = {};

    request.params.signal = controller.signal;
    setTimeout(() => controller.abort(), timeoutMs);

    return fetch(request.url, request.params);
  }
}

module.exports = Querier;
