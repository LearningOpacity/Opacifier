const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Request = require('../../../src/Request')
const Response = require('../../../src/Response')
const Logger = require('../../../src/logging_config')

Logger.transports[0].silent = true

describe('Coordinator', () => {
  describe('When Recieving a valid request', () => {
    const validRequest = new Request('www.google.com', 'search?q=hello')

    test('Should call Querier', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)

      expect(mockQuerierProcessRequest).toHaveBeenCalled()
    })

    test('Should call Querier with the Request it recieved', () => {
      const mockQuerierProcessRequest = jest.fn()
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)

      expect(mockQuerierProcessRequest).toHaveBeenCalledWith(validRequest)
    })

    test('Should return a Response', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      const result = Coordinator.processRequest(validRequest)

      expect(result).toBeInstanceOf(Response)
    })

    test('Should return the response from the Querier\'s Response', () => {
      const queriersResponse = new Response()

      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(queriersResponse)
      Querier.processRequest = mockQuerierProcessRequest

      const result = Coordinator.processRequest(validRequest)

      expect(result).toBe(queriersResponse)
    })

    test('Should log the request', () => {
      const mockLoggerInfo = jest.fn()
      Logger.info = mockLoggerInfo

      Coordinator.processRequest(validRequest)

      expect(mockLoggerInfo).toHaveBeenCalled()
    })
  })

  describe('When Recieving an invalid Request', () => {
    const invalidRequest = new Request()

    test('Should return an error Response', () => {
      const response = Coordinator.processRequest(invalidRequest)

      expect(response.isError).toEqual(true)
    })

    test('Should log an error', () => {
      const mockLoggerInfo = jest.fn()
      Logger.info = mockLoggerInfo

      Coordinator.processRequest(invalidRequest)

      expect(mockLoggerInfo).toHaveBeenCalled()
    })
  })
})
