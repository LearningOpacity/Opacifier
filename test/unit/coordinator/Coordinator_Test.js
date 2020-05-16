// const assert = require('assert')
const expect = require('chai').expect
const jest = require('jest')
const mocha = require('mocha')

const Coordinator = require('../../../src/Coordinator')
const Querier = require('../../../src/Querier')
const Request = require('../../../src/Request')
const Response = require('../../../src/Response')

mocha.describe('Coordinator', () => {
  mocha.it('Should call Querier', () => {
    const mockQuerierHandleRequest = jest.fn()
    mockQuerierHandleRequest.mockReturnValue(new Response())
    Querier.handleRequest = mockQuerierHandleRequest

    Coordinator.handleRequest(new Request())

    expect(mockQuerierHandleRequest).toBeCalled()
  })
})
