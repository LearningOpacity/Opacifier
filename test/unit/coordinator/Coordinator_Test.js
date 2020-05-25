const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Logger = require('../../../src/logging_config')

Logger.transports[0].silent = true

describe('Coordinator', () => {
  describe('When Recieving a valid request', () => {
    const validRequest = new Request({url: 'www.google.com/search?q=hello'})

    test('Should call Querier', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(Promise.resolve(new Response()))
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)
        .then(() => {
          expect(mockQuerierProcessRequest).toHaveBeenCalled()
        })
    })

    test('Should call Querier with the Request it recieved', () => {
      const mockQuerierProcessRequest = jest.fn()
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)
        .then(() => {
          expect(mockQuerierProcessRequest).toHaveBeenCalledWith(validRequest)
        })
    })

    test('Should return a Response', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)
        .then(result => {
          expect(result).toBeInstanceOf(Response)
        })
    })

    test('Should return the response from the Querier\'s Response', () => {
      const queriersResponse = new Response()

      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(queriersResponse)
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(validRequest)
        .then(result => {
          expect(result).toBe(queriersResponse)
        })
    })

    test('Should log the request', () => {
      const loggerInfoSpy = jest.spyOn(Logger, 'info')

      Coordinator.processRequest(validRequest)
        .then(() => {
          expect(loggerInfoSpy).toHaveBeenCalled()
        })
    })
  })

  describe('When Recieving an invalid Request', () => {
    const invalidRequest = new Request()

    test('Should return an error Response', () => {
      Coordinator.processRequest(invalidRequest)
        .then(response => expect(response.isError).toEqual(true))
    })

    test('Should log an error', () => {
      const loggerInfoSpy = jest.spyOn(Logger, 'info')

      Coordinator.processRequest(invalidRequest)
        .then(() => expect(loggerInfoSpy).toHaveBeenCalled())
    })
  })
})
