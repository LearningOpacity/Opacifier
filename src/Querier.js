const Response = require('./Response');

/** Class that queries 3rd party data sources */
class Querier {
  /**
     * Handle a request
     * @param {Request} request
     * @return {Response} The Response
     */
  static processRequest(request) {
    return new Response();
  }
}

module.exports = Querier;
