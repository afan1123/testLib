import Vue from 'vue'
import { Base64 } from 'js-base64'
import { validateDOMAIN, validateIP, validateHASH, validateURL, validateEmail } from '@/utils/validate'
Vue.prototype.$Base64 = Base64
Vue.prototype.$JudgeType = (str) => {
  if (validateHASH(str)) {
    return 'hash'
  } else if (validateEmail(str)) {
    return 'email'
  } else if (validateURL(str)) {
    return 'url'
  } else if (validateIP(str)) {
    return 'ip'
  } else if (validateDOMAIN(str)) {
    return 'domain'
  }
}

/**
* @param num： 被操作数
* @param n： 固定的总位数
*/
Vue.prototype.$PrefixZero = (num, n = 3) => {
  return (num + '').padStart(n, '0')
}

/**
* @param code： 映射编码
*/
Vue.prototype.$MapCode = {
  DefenceCode: '0000',
  VulnDetailCode: '0001',
  VulnListCode: '0002',
  TopicLog4jCode: '0003',
  IntellCode: '0004',
  IpCode: '0005',
  HashCode: '0006',
  DomainCode: '0007',
  UrlCode: '0008',
  EmailCode: '0009',
  CredentialCode: '0010',
  TopicUaCode: '0011'
}

/**
* @param score： 威胁分数
*/

Vue.prototype.$IntellLevel = (score) => {
  if (!score && score !== 0) {
    return { tabClass: '', iconText: '', iconClass: '' }
  } else {
    if (score >= 0 && score <= 9) {
      return { tabClass: 'c_green_intell', iconText: '安全', iconClass: 'ti_green' }
    } else if (score >= 10 && score <= 29) {
      return { tabClass: 'c_unknow', iconText: '未知', iconClass: 'ti_hui' }
    } else if (score >= 30 && score <= 59) {
      return { tabClass: 'c_orange', iconText: '可疑', iconClass: 'ti_orange' }
    } else if (score >= 60 && score <= 79) {
      return { tabClass: 'c_amber_intell', iconText: '恶意', iconClass: 'ti_amber' }
    } else if (score >= 80 && score <= 100) {
      return { tabClass: 'c_red', iconText: '恶意', iconClass: 'ti_red' }
    }
  }
}

