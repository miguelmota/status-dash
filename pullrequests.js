const { makeRequest, fetch } = require('./common')
const username = 'miguelmota'

async function main () {
  const repos = await makeRequest(`https://api.github.com/user/repos`)
  const counts = {}

  await Promise.all(repos.map(async repo => {
    if (repo.owner.login !== username) return
    const pullrequests = await fetch(`https://api.github.com/repos/${repo.full_name}/pulls?state=open`)

    pullrequests
      .filter(x => (!x.draft && !x.fork && x.url.indexOf(username) > -1 && x.state === 'open'))
      .forEach(x => {
        if (!counts[repo.full_name]) {
          counts[repo.full_name] = 0
        }
        counts[repo.full_name]++
        console.log('----------')
        console.log(x.title)
        console.log(x.url)
        console.log('----------')
        console.log('\n\n')
      })
  }))

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
