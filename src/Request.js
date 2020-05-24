/** Class representing a request processed by the system */
class Request {
  /**
   * Create a request
   * @param {string} requestHost
   * @param {string} httpRequest
   */
  constructor(requestHost, httpRequest) {
    this.requestHost = requestHost;
    this.httpRequest = httpRequest;
  }

  /**
   * Create a string description of the request
   * @return {string} A string description of the request
   */
  stringify() {
    return 'A Request';
  }
}

module.exports = Request;
