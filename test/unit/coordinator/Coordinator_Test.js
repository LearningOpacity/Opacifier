const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Request = require('../../../src/Request')
const Response = require('../../../src/Response')

describe('Coordinator', () => {
  describe('When Recieving a valid response', () => {
    test('Should call Querier', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(new Request())

      expect(mockQuerierProcessRequest).toBeCalled()
    })

    test('Should return a Response', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      const result = Coordinator.processRequest(new Request())

      expect(result).toBeInstanceOf(Response)
    })
  })

  describe('When Recieving an invalid response', () => {
    test('Should return an error Response', () => {
      const mockQuerierProcessRequest = jest.fn()
      mockQuerierProcessRequest.mockReturnValue(new Response())
      Querier.processRequest = mockQuerierProcessRequest

      Coordinator.processRequest(new Request())

      // TODO: Finish this
      expect(true).toBeInstanceOf(false)
    })
  })
})
