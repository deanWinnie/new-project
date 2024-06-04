//对外暴露的路由
export const constantRoute = [
	{
		//登录
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'login',
	},
	{
		//登录后的主页
		path: '/',
		component: () => import('@/views/home/index.vue'),
		name: 'layout',
	},
	{
		//404
		path: '/404',
		component: () => import('@/views/404/index.vue'),
		name: '404',
	},
	{
		//任意路由 当路由没有匹配路由表中的路由的时候就重定向到任意路由
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'Any',
	},
]
