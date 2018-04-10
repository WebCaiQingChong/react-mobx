import ua from './ua'
const hackSyncWechatTitle = () => {
  var iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = '/favicon.ico'
  iframe.onload = () => {
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 10)
  }
  document.body.appendChild(iframe)
}

export const setTitle = (title) => {
  document.title = title || '啦啦啦啦'
  if (document.title && (ua() === 3)) {
    hackSyncWechatTitle()
  }
}
