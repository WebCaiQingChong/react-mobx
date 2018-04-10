export default (name, url) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = url.substr(1).match(reg)
  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null
}
