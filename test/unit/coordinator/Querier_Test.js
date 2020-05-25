const Querier = require('../../../src/Querier')
const { validRequest } = require('./Test_Common')

describe.skip('Quierier', () => {
  describe('When Recieving a Request', () => {
    test('Should query the Request\'s host', () => {
      // TODO: fill this in

      Querier.processRequest(validRequest)
        .then(() => expect(true).toEqual(true))
        .catch(error => { throw error })
    })

    // TODO: figure out timout. Maybe a global config?
    test('Should call timeout after 5 seconds by returning an error Response', () => {
      Querier.processRequest(validRequest)
        .then(() => expect(true).toEqual(true))
        .catch(error => { throw error })
    })
  })
})
