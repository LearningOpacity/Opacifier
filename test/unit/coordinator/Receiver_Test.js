const { validRequest } = require('./Test_Common')

const Receiver = require('../../../src/Receiver')

describe('Receiver', () => {
  describe('When Recieving a Request', () => {
    test('Should query the Request\'s host', () => {
      const mockFetch = fetchMock.mockResponseOnce(JSON.stringify({ field: 'value' }))
      return Querier.processRequest(validRequest)
        .then(() => expect(mockFetch).toHaveBeenCalledWith(validRequest.url, validRequest.params))
    })
  })
})
