/** Class representing a a request processed by the system */
export class Request {
  /**
   * Create a request
   * @param {*} requestHost
   * @param {*} httpRequest
   */
  constructor(requestHost, httpRequest) {
    this.requestHost = requestHost;
    this.httpRequest = httpRequest;
  }
}
