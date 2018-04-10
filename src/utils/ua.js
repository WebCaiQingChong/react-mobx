export default () => {
  const ua = navigator.userAgent
  if ((/MicroMessenger/i).test(ua)) {
    return 1
  } else if ((/AlipayClient/i).test(ua)) {
    return 2
  } else if (/iPad|iPhone|iPod/.test(ua)) {
    return 3
  } else {
    return 0
  }
}
