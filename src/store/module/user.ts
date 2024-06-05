import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { LoginForm } from '@/api/user/type'
import { constantRoute } from '@/router/router'
const useUserStore = defineStore('User', {
	state: () => {
		return {
			token: localStorage.getItem('TOKEN'),
			menuRoutes: constantRoute,
		}
	},
	actions: {
		async userLogin(data: LoginForm) {
			const res = await reqLogin(data)
			if (res) {
				this.token = res.data.token
				localStorage.setItem('TOKEN', res.data.token)
				return res.data
			} else {
				return Promise.reject(new Error())
			}
		},
	},
	getters: {},
})
export default useUserStore
