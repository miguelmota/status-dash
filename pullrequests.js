const { makeRequest, fetch } = require('./common')
const username = 'miguelmota'

async function main () {
  const repos = await makeRequest(`https://api.github.com/user/repos`)

  repos.forEach(async repo => {
    if (repo.owner.login !== username) return
    const issues = await fetch(`https://api.github.com/repos/${repo.full_name}/pulls?state=open`)

    issues
      .filter(x => (!x.fork && x.url.indexOf(username) > -1 && x.state === 'open'))
      .forEach(x => {
        console.log('----------')
        console.log(x.title)
        console.log(x.url)
        console.log('----------')
        console.log('\n\n')
      })
  })
}

module.exports = {
  main
}

if (require.main === module) {
  main()
}
