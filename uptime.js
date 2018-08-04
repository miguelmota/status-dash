const url = require('url')
const Client = require('uptime-robot')
const chalk = require('chalk')
var client = null

const apiKey = process.env.UPTIMEROBOT_API_KEY
if (!apiKey) {
  throw new Error('api key is required')
}
client = new Client(apiKey)

const statuses = {
  '0': 'paused',
  '1': 'unknown', // not checked yet
  '2': 'up',
  '8': 'down', // seems down
  '9': 'down'
}

const colors = {
  '0': 'gray',
  '1': 'yellow',
  '2': 'green',
  '8': 'red',
  '9': 'red'
}

async function getMonitors () {
  return new Promise((resolve, reject) => {
    client.getMonitors({}, (err, res) => {
      if (err) return reject(err)
      resolve(res.filter(x => x.status !== '0').map(x => {
        return {
          url: x.url,
          status: x.status
        }
      }))
    })
  })
}

async function render (data) {
  data = data.slice()
  data.forEach(x => {
    console.log(`${chalk[colors[x.status]](statuses[x.status].padEnd(12, '.'))}${url.parse(x.url).hostname || x.url}`)
  })
}

async function main () {
  const result = await getMonitors()
  render(result)
}

async function example () {
  render([
    {
      url: 'https://example.com',
      status: 0
    },
    {
      url: 'https://example.net',
      status: 1
    },
    {
      url: 'https://example.org',
      status: 2
    },
    {
      url: 'https://example.co.uk',
      status: 8
    },
    {
      url: 'https://example.io',
      status: 9
    }
  ])
}

module.exports = {
  getMonitors,
  render,
  main
}

if (require.main === module) {
  if (process.env.EXAMPLE) {
    example()
  } else {
    main()
  }
}
