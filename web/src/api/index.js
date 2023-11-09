import request from '@/request'

/**
 * 获取配置信息
 * @param {*} params
 */
export function getConfig() {
  return request({
    url: 'config',
    method: 'get',
    params: {}
  })
}

/**
 * 重定向登录验证
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function login(params = {}) {
  return request({
    url: 'user/redirect',
    method: 'get',
    params
  })
}

/**
 * 跳转TIP
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function RedirectTip(params = {}) {
  return request({
    url: 'user/toTip',
    method: 'get',
    params
  })
}

