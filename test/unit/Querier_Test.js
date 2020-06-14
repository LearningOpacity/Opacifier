/**
 * @group unit
 */

const fetchMock = require('jest-fetch-mock')
fetchMock.enableMocks()
const { validRequest } = require('./Test_Common')
const config = require('config')
const logger = require('../../src/logging_config')
const Querier = require('../../src/Querier')

logger.transports[0].silent = true

describe('Quierier', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('When Recieving a Request', () => {
    test('Should query the Request\'s host', () => {
      const mockFetch = fetchMock.mockResponseOnce(JSON.stringify({ field: 'value' }))
      return Querier.processRequest(validRequest)
        .then(() => expect(mockFetch).toHaveBeenCalledWith(validRequest.originalUrl.substr(1), validRequest.params))
    })

    test('Should return the Request\'s host\'s response', () => {
      const returnedData = { data: '12345' }
      fetchMock.mockResponseOnce(JSON.stringify(returnedData))

      return Querier.processRequest(validRequest)
        .then(response => response.json())
        .then(response => expect(response).toEqual(returnedData))
    })

    test('Should call timeout after 5 seconds by returning an error Response', async () => {
      fetchMock.mockResponse(async () => {
        jest.advanceTimersByTime(config.get('querier.timeout') + 1)
        return ''
      })

      await expect(Querier.processRequest(validRequest)).rejects.toThrow()
    })

    test('Should log after timeout', async () => {
      fetchMock.mockResponse(async () => {
        jest.advanceTimersByTime(config.get('querier.timeout') + 1)
        return ''
      })

      const loggerInfoSpy = jest.spyOn(logger, 'error')

      await expect(Querier.processRequest(validRequest)).rejects.toThrow()
      await expect(loggerInfoSpy).toHaveBeenCalled()
    })
  })
})
