const moment = require('moment')
const chalk = require('chalk')
const url = require('url')
const { execSync } = require('child_process')
const { getMonitors } = require('./uptime')

async function getCerts () {
  const monitors = await getMonitors()
  return Promise.all(monitors.map(async x => {
    const host = url.parse(x.url).host
    const cmd = `echo | openssl s_client -servername ${host} -connect ${host}:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | sed -E 's/.*=//g'`
    const stdout = execSync(cmd)
    const date = stdout.toString().trim()
    return {date, host}
  }))
}

async function render (certs) {
  certs.forEach(({date, host}) => {
    const datemo = moment(date, 'MMM D hh:mm:ss YYYY')
    const week = moment().add(7, 'days')
    const month = moment().add(30, 'days')
    var color = 'white'
    if (datemo.isAfter(month)) {
      color = 'green'
    }
    if (datemo.isBefore(month)) {
      color = 'yellow'
    }
    if (datemo.isBefore(week)) {
      color = 'red'
    }

    console.log(`${chalk[color](date.padEnd(30, '.'))}${host}`)
  })
}

async function main () {
  const certs = await getCerts()
  render(certs)
}

module.exports = {
  getCerts,
  render,
  main
}

if (require.main === module) {
  main()
}
