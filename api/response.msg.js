const error = {
  code: 500,
  msg: '服务繁忙'
}

/**
 * 获取返回body内容
 * @param res
 * @returns {{data: {msg: string, code: number}}|{data: {msg: (*|string), code: (*|number)}}|*}
 */
function getBody(res) {
  try {
    if (!res) return { data: error }
    if (res.status !== 200) {
      if (res.data && JSON.stringify(res.data) !== '{}') return { data: res.data }
      return {
        data: {
          code: res.status || 500,
          msg: res.message || '服务繁忙'
        }
      }
    }
    return res
  } catch (e) {
    return res
  }
}

module.exports = {
  error : { data: error },
  getBody
}
