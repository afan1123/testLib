import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { setToken, getToken, removeToken } from '@/utils/auth'
import { getAuth } from '@/api/user'
import { redirect, redirectCyberCity } from '@/utils' // getToken from cookie
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach(async(to, from, next) => {
  clearInterval(store.state.type.FIleTimer) // 清除投递样本轮询
  NProgress.start() // start progress bar
  const isLogin = JSON.stringify(store.getters.userInfo) !== '{}'
  const isJudgeCommonAuth = JSON.stringify(store.getters.userAuth) !== '{}'
  if (to.query.passwordcode) {
    store.commit('CHANGE_PASSDIOLAG', true)
  }
  if (to.query.token) {
    setToken(to.query.token)
    return next(to.path)
  }
  const myToken = getToken()

  if (!isLogin && myToken) {
    await store.dispatch('getUser')
  }
  if (!isJudgeCommonAuth && myToken) {
    await store.dispatch('getUserAuth')
  }

  if (!to.meta.role) { // false
    // return next()
  }
  // 本地有token
  if (myToken) {
    const { data: res } = await getAuth()
    if (res.code === 200) {
      next()
    } else if (res.code === 401) {
      return Message({
        message: '暂无权限',
        type: 'error',
        duration: 3 * 1000
      })
    } else if (res.code === 414) {
      const to = { path: '/home', user_path: '/verifyEmail' }
      redirect(to)
    } else {
      removeToken()
      const to = { path: '/home' }
      redirect(to)
    }
  } else {
    if (to.query.from) {
      const flag = to.query.from === 'tip'
      flag ? redirect({ path: '/city' }) : redirectCyberCity({ path: to.query.from })
    } else {
      to.meta.role !== false ? redirect({ path: `${to.path}` }) : next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
