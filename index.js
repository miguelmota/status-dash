const certs = require('./certs')
const uptime = require('./uptime')

async function main () {
  console.log('uptime status')
  await uptime.main()
  console.log()

  console.log('expiring certs')
  await certs.main()
}

main()
