const Coordinator = require('./Coordinator');

/** Class that recieves request from clients */
class Reciever {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {function} next
   */
  static async processRequest(req, res, next) {
    Coordinator.processRequest(req)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.end();
          res.send(`Error errno. ${err}`);
        });
  }
}

module.exports = Reciever;
