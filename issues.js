const { makeRequest } = require('./common')
const username = 'miguelmota'

async function main () {
  const issues = await makeRequest('https://api.github.com/user/issues?filter=all&sort=created&direction=asc&state=open')
  const counts = {}

  issues
    .filter(x => (!x.fork && !x.repository.archived && x.url.indexOf(username) > -1 && x.title !== 'TODO'))
    .forEach(x => {
      if (!counts[x.repository.full_name]) {
        counts[x.repository.full_name] = 0
      }
      counts[x.repository.full_name]++
      console.log('----------')
      console.log(x.repository.full_name)
      console.log(x.created_at)
      console.log(x.title)
      console.log(x.body)
      console.log('----------')
      console.log('\n\n')
    })

  console.log('summary:')
  for (let key in counts) {
    console.log(`${key}: ${counts[key]}`)
  }
}

module.exports = {
  main
}

if (require.main === module) {
  main()
}
