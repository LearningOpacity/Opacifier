const { validRequest, validResponse } = require('./Test_Common')
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

    // TODO: Figure out this test
    test.skip('Should send the response from the Coordinator', async () => {
      const mockCoordinatorProcessRequest = jest.fn()
      mockCoordinatorProcessRequest.mockImplementation(() => {
        return new Promise(resolve => validResponse)
      })
      Coordinator.processRequest = mockCoordinatorProcessRequest

      const resSend = jest.fn()
      const res = {}
      res.send = resSend

      await Receiver.processRequest(validRequest, res)
      expect(resSend).toHaveBeenCalledWith(validRequest)
    })
  })
})
