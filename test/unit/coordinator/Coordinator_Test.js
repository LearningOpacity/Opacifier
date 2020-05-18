const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Request = require('../../../src/Request')
const Response = require('../../../src/Response')

describe('Coordinator', () => {
  test('Should call Querier', () => {
    const mockQuerierProcessRequest = jest.fn()
    mockQuerierProcessRequest.mockReturnValue(new Response())
    Querier.processRequest = mockQuerierProcessRequest

    Coordinator.processRequest(new Request())

    expect(mockQuerierProcessRequest).toBeCalled()
  })
})
