let isInit = false
let historyMirror = null

export default function mobxRouter (history) {
  if (history && !isInit) {
    historyMirror = history
    isInit = true
    return historyMirror
  } else {
    return historyMirror
  }
}
