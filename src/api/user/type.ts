//登陆接口需要携带参数TS类型
export interface LoginForm {
	username: string
	password: string
}
//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}
//定义返回类型的接口
export interface LoginResponseData extends ResponseData {
	data: string
}
//定义用户信息的接口
export interface UserInfoResponseData extends ResponseData {
	data: {
		userId: number
		avatar: string
		name: string
		roles: string[]
		buttons: string[]
		routes: string[]
	}
}
