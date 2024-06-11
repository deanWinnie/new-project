//路由鉴权
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/module/user'
import setting from './setting'
NProgress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
	// to and from are both route objects. must call `next`.
	NProgress.start()
	const token = userStore.token
	const username = userStore.username
	//用户登录判断
	if (token) {
		if (to.path == '/login') {
			next({ path: '/' })
		} else {
			if (username) {
				next()
			} else {
				try {
					await userStore.userInfo()
				} catch (error) {
					//token过期等情况
					userStore.logout()
					next({ path: '/login', query: { redirect: to.path } })
				}
			}
		}
	} else {
		//用户未登录
		if (to.path === '/login') {
			next()
		} else {
			next({ path: '/login', query: { redirect: to.path } })
		}
	}
	next()
})
//全局的后置守卫
router.afterEach((to: any, from: any) => {
	// to and from are both route objects.
	document.title = setting.title + '-' + to.meta.title
	NProgress.done()
})
