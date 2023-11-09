import Cookies from 'js-cookie'
import { uuid } from 'vue-uuid'
const TokenKey = 'Admin-Token'
const PageId = 'Page-Id'
const lang = 'lang'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const hostname = location.hostname.split('.venuseye')[1]
  if (hostname) {
    return Cookies.set(TokenKey, token, { domain: '.venuseye' + hostname })
  }
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  const hostname = location.hostname.split('.venuseye')[1]
  if (hostname) {
    return Cookies.remove(TokenKey, { domain: '.venuseye' + hostname })
  } else {
    return Cookies.remove(TokenKey)
  }
}

export function getPageId() {
  return Cookies.get(PageId)
}

export function setPageId(num) {
  return Cookies.set(PageId, `${num}_${uuid.v1()}`)
}

export function removePageId() {
  return Cookies.remove(PageId)
}

export function getLang() {
  return Cookies.get(lang) || 'zh'
}

export function setLang(type) {
  return Cookies.set(lang, type)
}
