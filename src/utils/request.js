import axios from 'axios'
const config = require('../../config')
/**
 * @param options
 * options {
 *  url: 请求url
 *  method： 请求类型
 *  params: 请求参数
 * }
 */
const requestErr = (error) => {
  if (error && (error.code || error.status) && (error.msg || error.message || error.statusText)) {
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        code: `${error.code || error.status}`,
        msg: '网络开小差啦~~请重试'
      }
    }
    return {
      success: false,
      code: `${error.code || error.status}`,
      msg: error.msg || error.message || error.statusText
    }
  } else {
    return { success: false, code: '-1', msg: error && (error.msg || error.message) ? (error.msg || error.message) : JSON.stringify(error) }
  }
}
const requestSuccess = (response) => {
  if (!response) {
    return requestErr({ code: '-1', msg: '未知错误' })
  }
  if (!response.success) {
    return requestErr({ msg: response.msg, code: response.code })
  }
  return {
    success: true,
    data: response.data
  }
}
const fetch = async (options = {}) => {
  try {
    const { data } = await axios({
      timeout: config.requestTimeout,
      ...options
    })
    return requestSuccess(data)
  } catch (error) {
    return requestErr(error.response || error)
  }
}

export default fetch
