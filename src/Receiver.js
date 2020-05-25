const Coordinator = require('./Coordinator');

// TODO: Use promises

/** Class that recieves request from clients */
class Reciever {
  /**
     *
     * @param {Request} request
     * @return {Response}
     */
  processRequest(request) {
    return Coordinator.handleRequest(request);
  }
}

module.exports = Reciever;
