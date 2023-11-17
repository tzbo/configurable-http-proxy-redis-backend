
const isCluster = url => url.includes('cluster://')

const parseURL = (url) => {
  /*
    * If a valid Cluster url is given, convert it
    * to an object as specified in https://github.com/luin/ioredis.
    * Otherwise returns null.
    */


  let url1 = url.split('cluster://')[1]
  let password = null
  if (url1.includes('@')) {
    const [p, hh] = url1.split('@')
    password = p
    if (password.startsWith(':')) {
      password = password.substring(1)
    }
    url1 = hh
  }

  const hosts = []
  Object.values(url1.split(',')).forEach((h) => {
    if (!h) return
    const host = {}
    if (h.includes(':')) {
      const [ip, port] = h.split(':')
      host.host = ip
      host.port = Number(port)
    } else {
      host.host = h
    }
    hosts.push(host)
  })

  return { hosts, password }
}

module.exports = { parseURL, isCluster }
