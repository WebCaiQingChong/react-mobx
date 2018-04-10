import request from 'utils/request'
export const getData = (data) => {
  return request({
    url: '/api/zhk/1.0/common/area',
    data,
    method: 'post'
  })
}
