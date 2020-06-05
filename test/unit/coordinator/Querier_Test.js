const fetchMock = require('jest-fetch-mock')
fetchMock.enableMocks()
const { sleep, validRequest } = require('./Test_Common')

const Querier = require('../../../src/Querier')

describe('Quierier', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('When Recieving a Request', () => {
    test('Should query the Request\'s host', () => {
      const mockFetch = fetchMock.mockResponseOnce(JSON.stringify({ field: 'value' }))
      return Querier.processRequest(validRequest)
        .then(() => expect(mockFetch).toHaveBeenCalledWith(validRequest.url, validRequest.params))
    })

    test('Should return the Request\'s host\'s response', () => {
      const returnedData = { data: '12345' }
      fetchMock.mockResponseOnce(JSON.stringify(returnedData))

      return Querier.processRequest(validRequest)
        .then(response => response.json())
        .then(response => expect(response).toEqual(returnedData))
    })

    // TODO: figure out timout. Maybe a global config?
    test('Should call timeout after 5 seconds by returning an error Response', () => {
      fetchMock.mockResponseOnce(() => {
        sleep(3000).then(() => {
          return Promise.resolve(JSON.stringify({ data: '12345' }))
        })
      })

      expect(Querier.processRequest(validRequest)).rejects.toMatch('octopus')
    })
  })
})
