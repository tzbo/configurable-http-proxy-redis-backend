
const isCluster = url => url.includes('cluster://')

const parseURL = (url) => {
  /*
    * If a valid Cluster url is given, convert it
    * to an object as specified in https://github.com/luin/ioredis.
    * Otherwise returns null.
    */


  const url0 = url.split('cluster://')[1]
  const hosts = []
  Object.values(url0.split(',')).forEach((h) => {
    const host = {}
    let target = null
    if (h.includes('@')) {
      const [s0, s1] = h.split('@')
      host.password = s0
      target = s1
    }

    if (target.includes(':')) {
      const [ip, port] = target.split(':')
      host.host = ip
      host.port = Number(port)
    } else {
      host.host = target
    }
    hosts.push(host)
  })

  return hosts
}

module.exports = { parseURL, isCluster }
