const Querier = require('../../../src/Querier')
const Request = require('../../../src/Request')
// const Response = require('../../../src/Response')
// const Logger = require('../../../src/logging_config')

describe('Quierier', () => {
  describe('When Recieving a Request', () => {
    const validRequest = new Request('www.google.com', 'search?q=hello')

    test('Should call query the Request\'s host', () => {
      Querier.processRequest(validRequest)

      expect(false).toEqual(true)
    })

    // TODO: figure out timout. Maybe a global config?
    test('Should call timeout after 5 seconds by returning an error Response', () => {
      Querier.processRequest(validRequest)

      expect(false).toEqual(true)
    })
  })
})
