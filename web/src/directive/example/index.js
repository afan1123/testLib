/**
 * 示例：点击全屏指令
 */
export default {
  bind(el, binding) {
    el.onclick = function() {
      let dom = el
      // 获取当前展开全屏方式 arg === 'parent' 表示使用其父节点进入全屏
      if (binding.arg === 'parent') {
        dom = el.parentElement
      }
      const requestMethod = dom.requestFullScreen || dom.webkitRequestFullScreen || dom.mozRequestFullScreen || dom.msRequestFullScreen

      if (requestMethod) {
        requestMethod.call(dom)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }
}
