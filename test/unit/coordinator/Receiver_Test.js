const { validRequest, validResponse, invalidRequest } = require('./Test_Common')
const Receiver = require('../../../src/Receiver')
const Coordinator = require('../../../src/Coordinator')
const Logger = require('../../../src/logging_config')

Logger.transports[0].silent = true

describe('Receiver', () => {
  describe('When Recieving a Request', () => {
    test('Should call Coordinator with the Request it recieved', () => {
      const mockCoordinatorProcessRequest = jest.fn()
      Coordinator.processRequest = mockCoordinatorProcessRequest

      return Receiver.processRequest(validRequest)
        .then(() => {
          expect(mockCoordinatorProcessRequest).toHaveBeenCalledWith(validRequest)
        })
    })

    test('Should return the response from the Coordinator\'s Response', () => {
      const mockCoordinatorProcessRequest = jest.fn()
      mockCoordinatorProcessRequest.mockReturnValue(validResponse)
      Coordinator.processRequest = mockCoordinatorProcessRequest

      expect(Receiver.processRequest(validRequest)).resolves.toBe(validResponse)
    })
  })

  // TODO: Fill these in
  describe.skip('When Recieving an invalid Request', () => {
    test('Should return an Error', () => {
      expect.assertions(1)
      expect(Receiver.processRequest(invalidRequest)).rejects.toBeInstanceOf(Error)
    })

    test('Should log an error', () => {
      const loggerInfoSpy = jest.spyOn(Logger, 'info')

      return Receiver.processRequest(invalidRequest)
        .catch(() => expect(loggerInfoSpy).toHaveBeenCalled())
    })
  })
})
