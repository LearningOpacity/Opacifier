const fetch = require('node-fetch');
// const AbortController = require('abort-controller')

/** Class that queries 3rd party data sources */
class Querier {
  /**
     * Handle a request
     * @param {Request} request
     * @return {Promise<Response>} The Response
     */
  static async processRequest(request) {
    return Querier.timeoutPromise(100, new Error('Timed Out!'),
        fetch(request.url, request.params));
    // return Querier.fetchWithTimeout(request, 2000);
  }

  /**
   * timeoutPromise
   * @param {number} timeout
   * @param {Error} err
   * @param {Promise} promise
   * @return {Promise}
   */
  static async timeoutPromise(timeout, err, promise) {
    return new Promise(function(resolve, reject) {
      promise.then(resolve, reject);
      setTimeout(reject.bind(null, err), timeout);
    });
  }
  // static async timeoutPromise(ms, promise) {
  //   return new Promise(function(resolve, reject) {
  //     setTimeout(function() {
  //       reject(new Error('timeout'));
  //     }, ms);
  //     promise.then(resolve, reject);
  //   });
  // }

  /**
   * fetchWithTimeout
   * See this: https://javascript.info/fetch-abort
   * @param {Request} request
   * @param {number} timeoutMs
   * @return {Promise<Response | Error>} response
   */
  /* static async fetchWithTimeout(request, timeoutMs) {
    Querier.timeoutPromise(timeoutMs, fetch(request.url, request.params))
        .then((response) => {
          return Promise.resolve(response);
        }).catch((error) => {
          return Promise.reject(error);
        });
  } */

  // static async fetchWithTimeout(request, timeoutMs) {
  //   return Promise.race([
  //     fetch(request.url, request.params),
  //     new Promise((resolve, reject) =>
  //       setTimeout(() => reject(new Error('timeout')), timeoutMs),
  //     )
  //   ]);
  // }

  /* static async fetchWithTimeout(request, timeoutMs) {
    const controller = new AbortController();

    if (!request.params) request.params = {};

    request.params.signal = controller.signal;
    setTimeout(() => controller.abort(), timeoutMs);

    return fetch(request.url, request.params);
  } */
}

module.exports = Querier;
