import request from '@/utils/request'
import { User, UserResponse, AllRoleResponse, SetRoleData } from './type'
enum API {
	//获取全部已有的用户账号信息
	ALLUSER_URL = '/admin/acl/user/',
	//新增用户
	ADDUSER_URL = '/admin/acl/user/save',
	//修改用户
	UPDATE_URL = '/admin/acl/user/update',
	//获取全部职位
	ALLROLE_URL = '/admin/acl/user/toAssign/',
	//分配角色
	SETROLE_URL = '/admin/acl/user/doAssignRole',
	//删除某一个账号
	DELETEUSER_URL = '/admin/acl/user/remove/',
	//批量删除
	DELETEUSERLIST_URL = '/admin/acl/user/batchRemove',
}
export const reqAllUser = (page: number, limit: number, username: string) =>
	request.get<any, UserResponse>(`${API.ALLUSER_URL}${page}/${limit}?username=${username}`)
export const reqAddOrUpdateUser = (data: User) => {
	if (data.id) {
		return request.put<any, any>(API.UPDATE_URL, data)
	} else {
		return request.post<any, any>(API.ADDUSER_URL, data)
	}
}
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponse>(API.ALLROLE_URL + userId)
export const reqSetRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)
export const reqDeleteUser = (id: number) => request.delete<any, any>(API.DELETEUSER_URL + id)
export const reqDeleteUserList = (idList: number[]) =>
	request.delete<any, any>(API.DELETEUSERLIST_URL, { data: idList })
