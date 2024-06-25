import type { CategoryObj } from '@/api/product/attr/type'
export interface CategoryState {
	c1Id: string | number
	c2Id: string | number
	c3Id: string | number
	c1List: CategoryObj[]
	c2List: CategoryObj[]
	c3List: CategoryObj[]
}
