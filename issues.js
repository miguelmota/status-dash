const { makeRequest } = require('./common')
const username = 'miguelmota'

async function main () {
  const issues = await makeRequest('https://api.github.com/user/issues?filter=all&sort=created&direction=asc&state=open')

  issues
    .filter(x => (!x.fork && x.url.indexOf(username) > -1 && x.title !== 'TODO'))
    .forEach(x => {
      console.log('----------')
      console.log(x.repository.full_name)
      console.log(x.created_at)
      console.log(x.title)
      console.log(x.body)
      console.log('----------')
      console.log('\n\n')
    })
}

module.exports = {
  main
}

if (require.main === module) {
  main()
}
