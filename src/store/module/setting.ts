import { defineStore } from 'pinia'
const useLayoutSettingStore = defineStore('SettingStore', {
	state: () => {
		return {
			fold: false,
		}
	},
	actions: {},
	getters: {},
})
export default useLayoutSettingStore
