/** Class representing a response processed by the system */
class Response {
  /**
     * Creates a new response
     */
  constructor() {
    this.isError = false;
  }

  /**
   * Creates a new error response
   * @param {string} errorText
   * @return {Response} an error Response
   */
  static createErrorResponse(errorText) {
    const newResponse = new Response();
    newResponse.isError = true;
    newResponse.errorText = errorText;
    return newResponse;
  }
}

module.exports = Response;
