const Coordinator = require('Coordinator');

/** Class that recieves request from clients */
export class Reciever {
  /**
     *
     * @param {Request} request
     * @return {Response}
     */
  processRequest(request) {
    return Coordinator.handleRequest(request);
  }
}
