const validRequest = {
  url: 'http://google.com/search?q=hello'
}

const invalidRequest = {
  url: 'http://google.com/search?q=badword'
}

const validResponse = {
  url: 'http://google.com/search?q=hello'
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  invalidRequest: invalidRequest,
  sleep: sleep,
  validRequest: validRequest,
  validResponse: validResponse
}
