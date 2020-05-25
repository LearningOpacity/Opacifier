const AbortController = require('abort-controller');
const fetch = require('node-fetch');

/** Class that queries 3rd party data sources */
class Querier {
  /**
     * Handle a request
     * @param {Request} request
     * @return {Promise<Response>} The Response
     */
  static async processRequest(request) {
    return Querier.fetchWithTimeout(request, 5000);
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
    const signal = controller.signal; // get signal
    const params = {
      method: 'GET',
      signal, // bind controller to this fetch request using signal
    };

    setTimeout(() => controller.abort(), timeoutMs);

    return fetch(request.url, params)
        .then((data) => data.json());
  }
}

module.exports = Querier;
