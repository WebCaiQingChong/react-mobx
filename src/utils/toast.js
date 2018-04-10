export default (tips) => {
  const tipsRoot = document.getElementById('tips')
  const div = document.createElement('div')
  div.innerHTML = tips
  div.className = 'tips'
  tipsRoot.appendChild(div)
  setTimeout(() => {
    tipsRoot.innerHTML = ''
  }, 2000)
}
