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
    //console.log(`Receiver: recieved ${req.originalUrl}`);
    await Coordinator.processRequest(req)
        .then((response) => {
          console.log(`Receiver: recieved succsseful response from Coordinator: ` + JSON.stringify(response)) 
          res.send(response);
        })
        .catch((err) => {
          //console.log(`Receiver: recieved error response from Coordinator: ${err}`)
          res.send(`Error errno. ${err}`);
        });
  }
}

module.exports = Reciever;
