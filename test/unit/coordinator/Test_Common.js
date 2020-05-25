const validRequest = {
  url: 'http://google.com/search?q=hello'
}

const invalidRequest = {
  url: 'http://google.com/search?q=badword'
}

const validResponse = {
  url: 'http://google.com/search?q=hello'
}

module.exports = {
  invalidRequest: invalidRequest,
  validRequest: validRequest,
  validResponse: validResponse
}
