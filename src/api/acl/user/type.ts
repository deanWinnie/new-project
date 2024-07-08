//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface User {
	id?: number
	updateTime?: string
	createTime?: string
	username: string
	name: string
	phone?: null
	roleName?: string
	password?: string
}

export interface UserResponse extends ResponseData {
	data: {
		records: User[]
		total: number
		size: number
		current: number
		pages: number
	}
}
