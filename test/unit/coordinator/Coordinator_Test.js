const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Logger = require('../../../src/logging_config')
const { invalidRequest, validRequest, validResponse } = require('./Test_Common')

Logger.transports[0].silent = true

describe('Coordinator', () => {
  describe('When Recieving a valid request', () => {
    test('Should call Querier with the Request it recieved', () => {
      const mockQuerierProcessRequest = jest.fn()
      Querier.processRequest = mockQuerierProcessRequest

      return Coordinator.processRequest(validRequest)
        .then(() => {
          expect(mockQuerierProcessRequest).toHaveBeenCalledWith(validRequest)
        })
    })

    test('Should return the response from the Querier\'s Response', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(validResponse)
      Querier.processRequest = mockQuerierProcessRequest

      expect(Coordinator.processRequest(validRequest)).resolves.toBe(validResponse)
    })

    test('Should log the request', () => {
      const loggerInfoSpy = jest.spyOn(Logger, 'info')

      return Coordinator.processRequest(validRequest)
        .then(() => {
          expect(loggerInfoSpy).toHaveBeenCalled()
        })
    })
  })

  describe('When Recieving an invalid Request', () => {
    test('Should return an Error', () => {
      expect.assertions(1)
      expect(Coordinator.processRequest(invalidRequest)).rejects.toBeInstanceOf(Error)
    })

    test('Should log an error', () => {
      const loggerInfoSpy = jest.spyOn(Logger, 'info')

      return Coordinator.processRequest(invalidRequest)
        .catch(() => expect(loggerInfoSpy).toHaveBeenCalled())
    })
  })
})
