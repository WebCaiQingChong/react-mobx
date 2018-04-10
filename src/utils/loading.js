export default class {
  static start () {
    const tipsRoot = document.getElementById('tips')
    const div = document.createElement('div')
    const span = document.createElement('span')
    span.innerHTML = 'waiting...'
    div.appendChild(span)
    div.className = 'loading'
    tipsRoot.appendChild(div)
  }
  static end () {
    const tipsRoot = document.getElementById('tips')
    tipsRoot.innerHTML = ''
  }
}
