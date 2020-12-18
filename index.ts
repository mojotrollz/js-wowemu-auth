import { randomBytes, createHash } from 'crypto'
import bigInt from 'big-integer'

export const hex2bin = (s: String) => {
  const ret = []
  for (let i = 0, l = s.length; i < l; i += 2) {
    const c = parseInt(s.substr(i, 1), 16)
    const k = parseInt(s.substr(i + 1, 1), 16)
    if (isNaN(c) || isNaN(k)) return false
    ret.push((c << 4) | k)
  }
  return String.fromCharCode.apply(String, ret)
}

export const bin2hex = (s: String) => {
  let result = ''
  for (let i = 0, l = s.length; i < l; i++) {
    const n = s.charCodeAt(i).toString(16)
    result += n.length < 2 ? '0' + n : n
  }
  return result
}

export const reverseHex = (string: String) => {
  const bytes = []
  for (let i = 0, length = string.length; i < length; i += 2) {
    bytes.push(string.substr(i, 2))
  }
  return bytes.reverse().join('')
}

export const register = (
  username: String,
  password: String,
  gHex = '07',
  NHex = '894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7'
) => {
  const g = bigInt(gHex, 16)
  const N = bigInt(NHex, 16)
  const saltDB = bin2hex(randomBytes(32).toString('binary'))
  const salt = hex2bin(reverseHex(saltDB))
  const identity = createHash('sha1')
    .update((username + ':' + password).toUpperCase())
    .digest('latin1')
  const sha = reverseHex(
    createHash('sha1')
      .update(salt + identity, 'latin1')
      .digest('hex')
  )
  const privateKey = bigInt(sha, 16)
  const verifier = g.modPow(privateKey, N).toString(16)
  return { salt: saltDB, verifier }
}
