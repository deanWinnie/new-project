//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface Permission {
	id?: number
	updateTime?: string
	createTime?: string
	pid: number
	name: string
	code: null
	toCode: null
	type: number
	status: null
	level: number
	children?: PermissionList
	select: boolean
}
export type PermissionList = Permission[]
export interface PermissionResponse extends ResponseData {
	data: PermissionList
}
export interface MenuParams {
	id?: number
	code: string
	level: number
	name: string
	pid: number
}
