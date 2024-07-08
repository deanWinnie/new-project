import request from '@/utils/request'
import { User, UserResponse } from './type'
enum API {
	//获取全部已有的用户账号信息
	ALLUSER_URL = '/admin/acl/user/',
	//新增用户
	ADDUSER_URL = '/admin/acl/user/save',
	//修改用户
	UPDATE_URL = '/admin/acl/user/update',
}
export const reqAllUser = (page: number, limit: number) =>
	request.get<any, UserResponse>(`${API.ALLUSER_URL}${page}/${limit}`)
export const reqAddOrUpdateUser = (data: User) => {
	if (data.id) {
		return request.put<any, any>(API.UPDATE_URL, data)
	} else {
		return request.post<any, any>(API.ADDUSER_URL, data)
	}
}
