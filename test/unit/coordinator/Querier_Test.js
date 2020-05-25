const Querier = require('../../../src/Querier')
// const Logger = require('../../../src/logging_config')

describe('Quierier', () => {
  describe('When Recieving a Request', () => {
    const validRequest = new Request('www.google.com', 'search?q=hello')

    test('Should query the Request\'s host', () => {
      // TODO: fill this in

      Querier.processRequest(validRequest)
        .then(() => expect(true).toEqual(true))
    })

    // TODO: figure out timout. Maybe a global config?
    test('Should call timeout after 5 seconds by returning an error Response', () => {
      Querier.processRequest(validRequest)
        .then(() => expect(true).toEqual(true))
    })
  })
})
