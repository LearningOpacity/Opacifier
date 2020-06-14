/**
 * @group integration
 */

//const mockServer = require('mockttp').getLocal()

var nock = require('nock');
const Request = require('supertest')
const app = require('../../src/index')
const { validResponse } = require('../Test_Common')

const Logger = require('../../src/logging_config')
Logger.transports[0].silent = true

// TODO: Get this working
describe('when receiving a valid request', () => {
  const request = Request(app)
  const nockMock = nock('http://google.com')
      .persist()
      .log(console.log)
      .get('/')
      .reply(200,validResponse);

  it('Should return the response from the 3rd party source', async () => {
    await request
      .post('/http://google.com')
      .expect(200, validResponse)

    expect(nockMock.isDone()).toBeTruthy()
  })
})
