//商品分类全局组件的小仓库

import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryState } from './type'
const useCategoryStore = defineStore('Category', {
	state: (): CategoryState => {
		return {
			c1List: [],
			c2List: [],
			c3List: [],
			c1Id: '',
			c2Id: '',
			c3Id: '',
		}
	},
	actions: {
		async getC1() {
			const res = await reqC1()
			if (res) {
				this.c1List = res.data
			}
		},
		async getC2() {
			const res = await reqC2(this.c1Id as number)
			if (res) {
				this.c2List = res.data
			}
		},
		async getC3() {
			const res = await reqC3(this.c2Id as number)
			if (res) {
				this.c3List = res.data
			}
		},
	},
})
export default useCategoryStore
