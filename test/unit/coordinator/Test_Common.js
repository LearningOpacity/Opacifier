const validRequest = {
  url: 'http://google.com/search?q=hello'
}

const invalidRequest = {
  url: 'http://google.com/search?q=badword'
}

class MyResponse {
  constructor (url) {
    this.url = url
  }

  send () {}
}

const validResponse = new MyResponse('http://google.com/search?q=hello')

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  invalidRequest: invalidRequest,
  sleep: sleep,
  validRequest: validRequest,
  validResponse: validResponse
}
