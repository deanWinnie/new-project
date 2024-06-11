import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
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
				this.token = res.data.token
				localStorage.setItem('TOKEN', res.data.token)
				return res.data
			} else {
				return Promise.reject(new Error())
			}
		},
		async userInfo() {
			const res = await reqUserInfo()
			if (res) {
				this.username = res.data.checkUser.username
				this.avatar = res.data.checkUser.avatar
				return res.data
			} else {
				return Promise.reject(new Error())
			}
		},
		logout() {
			this.username = ''
			this.avatar = ''
			this.token = ''
			localStorage.removeItem('TOKEN')
		},
	},
	getters: {},
})
export default useUserStore
