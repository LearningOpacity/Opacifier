const { validRequest, validResponse } = require('./Test_Common')
const Receiver = require('../../../src/Receiver')
const Coordinator = require('../../../src/Coordinator')
const Logger = require('../../../src/logging_config')

Logger.transports[0].silent = true

describe('Receiver', () => {
  describe('When Recieving a Request', () => {
    test('Should call Coordinator with the Request it recieved', async () => {
      Coordinator.processRequest = jest.fn().mockResolvedValue(validResponse)

      const mockRes = {}
      mockRes.send = jest.fn()

      await Receiver.processRequest(validRequest, mockRes)
      expect(Coordinator.processRequest).toHaveBeenCalledWith(validRequest)
    })

    test('Should send the response from the Coordinator', async () => {
      Coordinator.processRequest = jest.fn().mockResolvedValue(validResponse)

      const mockRes = {}
      mockRes.send = jest.fn()

      await Receiver.processRequest(validRequest, mockRes)
      expect(mockRes.send).toHaveBeenCalledWith(validResponse)
    })

    test('Should not call next()', async () => {
      Coordinator.processRequest = jest.fn().mockResolvedValue(validResponse)

      const mockRes = {}
      mockRes.send = jest.fn()

      const mockNext = jest.fn()

      await Receiver.processRequest(validRequest, mockRes, mockNext)
      expect(mockNext).toHaveBeenCalledTimes(0)
    })

    // TODO: get this working
    test('Should handle errors', async () => {
      const theError = new Error('some text')
      Coordinator.processRequest = jest.fn().mockImplementation(() => Promise.reject(theError))

      const mockRes = {}
      mockRes.send = jest.fn()
      mockRes.end = jest.fn()

      await Receiver.processRequest(validRequest, mockRes)
      // expect(mockRes.end).toHaveBeenCalledTimes(1)
      expect(mockRes.send).toHaveBeenCalledWith(theError)
    })
  })
})
