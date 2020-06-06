const Coordinator = require('./Coordinator');

// TODO: Use promises

/** Class that recieves request from clients */
class Reciever {
  /**
     *
     * @param {Request} request
     * @return {Response}
     */
  static async processRequest(request) {
    return Coordinator.processRequest(request);
  }
}

module.exports = Reciever;
