import { login } from '@/api'
import router from '@/router'
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    const time_length = ('' + parseInt(time)).length
    if (time_length === 9 || time_length === 10) time = parseInt(time) * 1000
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 将时间戳转换为时间
export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' '
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return {
    All: Y + M + D + h + m + s,
    YMD: Y + M + D
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

// 选择时间插件配置
export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 *
 * @param {Array} listData  全部数据
 * @param {Number} size     当前页条数
 * @param {Number} page     当前页
 */
export function getPagination(listData = [], size = 10, page = 1) {
  if (!listData.length) {
    return {
      pagination: {},
      data: []
    }
  }
  const count = listData.length
  const current_page = page || Math.ceil(count / size)
  const pagination = {
    sizes: [10, 20, 40, 60, 80],
    size,
    current_page,
    count
  }
  const start = (size - 1) * (current_page - 1)
  const end = start + size
  const data = listData.slice(start, end)
  return ({
    pagination,
    data
  })
}

// 根据威胁分值获取等级(狩猎)
export function getLevel(level, take = 1) {
  const score = Math.floor(level * take)
  if (!score || score === 0) {
    return { class: 'gray', text: '未知' }
  }
  if (score < 40) {
    return { class: 'green', text: '低' }
  }
  if (score < 80) {
    return { class: 'yellow', text: '中' }
  }
  return { class: 'red', text: '高' }
}

// 根据威胁分值获取等级(沙箱)
export function getSandBoxLevel(level, take = 1) {
  const score = Math.floor(level * take)
  const arr = ['zero', 'one', 'two', 'three', 'four', 'five']
  const remainder = score % 20 === 0 ? 0 : 1
  const index = parseInt(score / 20 + remainder)
  return arr[index]
}

/**
 * 去除字符串空格
 * @param { string } str 字符串
 */
export function RemoveSpace(str) {
  return str.replace(/\s*/g, '')
}

/**
 * 新窗口打开url
 *
 * @export
 * @param {*} path
 */
export function openTab(path) {
  if (path) {
    const url = router.resolve({ path }).href
    window.open(url, '_blank')
  }
}

// 节点类型
const GraphTypes = [
  'ip',
  'url',
  'md5',
  'jhash',
  'image',
  'domain',
  'xmp'
]

// 关联节点类型
const RelationTypes = [
  'contacted_images',
  'image_features',
  'contacted_ips',
  'embedding_files',
  'contacted_urls',
  'contacted_domains',
  'contacted_domain',
  // jhash
  'email_jhash',
  'lnk_jhash',
  'macros_jhash',
  'macrosFunc_jhash',
  'payload_jhash',
  'pe_imp_jhash',
  'pe_rsrc_jhash',
  'rtf_struct_jhash',
  'rtf_obj_jhash'
]

// 威胁情报来源
export const sourceMap = {
  ve: '金睛团队',
  vsrc: 'VSRC',
  honeypot: 'Honeypot',
  adlab: 'ADLab',
  bdlab: 'BDLab',
  velab: 'VELab',
  dbg: 'DBG',
  zhigu: '智谷',
  newsky: 'NewSky',
  vsp: 'VSP',
  starso: '星维九州',
  sandbox: '云沙箱',
  venuseye: 'VenusEye',
  vt: 'VenusEye',
  d2: 'D²实验室'
}
// 行业
export const industryList = [
  '服务业',
  '信息技术',
  '信息安全',
  '房地产',
  '食品',
  '工业',
  '媒体',
  '游戏',
  '咨询',
  '广告',
  '航空航天',
  '农业',
  '支付',
  '零售业',
  '生物技术',
  '技术',
  '非营利',
  '制造业',
  '建筑业',
  '交通',
  '文化艺术',
  '娱乐业',
  '银行',
  '证券',
  '保险',
  '信托',
  '财务公司',
  '基金',
  '典当',
  '投资银行',
  '期货',
  '运营商',
  '通信技术',
  '政府单位',
  '教育',
  '中等教育',
  '高等教育',
  '烟草',
  '能源',
  '电力',
  '互联网',
  '医疗',
  '健康',
  '医药',
  '医院']
/**
 * 获取节点类型
 *
 * @export
 * @param {string} [name='']  节点类型
 * @returns
 */
export function getGraphType(name = '') {
  if (!name) return 'other'
  name = name.toLocaleLowerCase()
  // 节点类型
  if (GraphTypes.includes(name)) return name
  // 关联节点类型
  if (RelationTypes.includes(name)) return 'nodes'
  // 如果未找到相关节点, 则使用其它icon
  return 'other'
}

/**
 * 判断是否是关联节点类型
 *
 * @export
 * @param {string} [name='']
 * @returns
 */
export function isRelation(name = '') {
  if (!name) return true
  name = name.toLocaleLowerCase()
  return RelationTypes.includes(name)
}

/**
 * 路由跳转
 * @param { Router } to 需要进入的路由
 */
export const redirect = async(to) => {
  window.location.hash = ''
  // const url = router.resolve({ path: to.path }).href
  const redirectUrl = `${window.location.origin}/hash${to.path}`
  const { headers } = await login({ redirectUrl, userPath: to.user_path || '' })
  window.location.href = decodeURIComponent(headers['ve-redirect'])
}

/**
 * 路由跳转
 * @param { Router } to 需要进入的路由
 */
export const redirectCyberCity = async(to) => {
  const redirectUrl = `${to.path}`
  const { headers } = await login({ redirectUrl })
  window.location.href = decodeURIComponent(headers['ve-redirect'])
}

// 添加用户标签、误报反馈、评论
export const getParamsTypeNum = path => {
  const path_arr = ['home/ip', 'home/domain', 'home/url', 'home/hash', 'home/email', 'home/credential']
  var num = 0
  path_arr.some((v, k) => {
    if (path.indexOf(v) !== -1) {
      num = k + 1
      return true
    }
  })
  return num
}

export const toThousands = (num = 0) => {
  return num.toString().replace(/\d+/, function(n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}

