const request = require('request-promise')

async function makeRequest (url) {
  var results = []
  for (var i = 1; i <= 10; i++) {
    try {
      const data = await fetch(url, i)
      results = results.concat(data)
    } catch (error) {

    }
  }

  return results
}

async function fetch (url, page = 1) {
  return request({
    uri: url,
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
      'authorization': `token ${process.env.GITHUB_TOKEN}`,
    },
    qs: {
      per_page: 100,
      page: page
    },
    json: true
  })
}

module.exports = {
  makeRequest,
  fetch
}
