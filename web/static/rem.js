(function(doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var whdef = 100 / 1920 // 表示1920的设计图,使用100PX的默认值
  var recalc = function() {
    var clientWidth = docEl.clientWidth // 当前窗口的宽度
    // console.log(clientWidth, 'clientWidth')
    var rem = clientWidth * whdef // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    if (!clientWidth) return
    docEl.style.fontSize = rem + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
