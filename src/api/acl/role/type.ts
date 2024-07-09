//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface RoleData {
	id?: number
	updateTime?: string
	createTime?: string
	roleName: string
	remark?: null
}

export interface RoleResponseData extends ResponseData {
	data: {
		records: RoleData[]
		total: number
		size: number
		current: number
		orders: []
		optimizeCountSql: boolean
		hitCount: boolean
		countId: null
		maxLimit: null
		searchCount: boolean
		pages: number
	}
}
export interface MenuData {
	id: number
	updateTime: string
	createTime: string
	pid: number
	name: string
	code: string
	toCode: string
	type: number
	status: null
	level: number
	children?: MenuDataList
	select: boolean
}
export type MenuDataList = MenuData[]
export interface MenuResponseData extends ResponseData {
	data: MenuDataList
}
