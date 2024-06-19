import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { LoginForm } from '@/api/user/type'
import { constantRoute } from '@/router/router'
const useUserStore = defineStore('User', {
	state: () => {
		return {
			token: localStorage.getItem('TOKEN'),
			menuRoutes: constantRoute,
			username: '',
			avatar: '',
		}
	},
	actions: {
		async userLogin(data: LoginForm) {
			const res = await reqLogin(data)
			if (res) {
				this.token = res.data
				localStorage.setItem('TOKEN', res.data)
				return res.data
			} else {
				return Promise.reject(new Error())
			}
		},
		async userInfo() {
			const res = await reqUserInfo()
			if (res) {
				this.username = res.data.name
				this.avatar = res.data.avatar
				return res.data
			} else {
				return Promise.reject(new Error())
			}
		},
		async logout() {
			const res = await reqLogout()
			if (res) {
				this.username = ''
				this.avatar = ''
				this.token = ''
				localStorage.removeItem('TOKEN')
				return res
			} else {
				Promise.reject(new Error())
			}
		},
	},
	getters: {},
})
export default useUserStore
