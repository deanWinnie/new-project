import request from '@/utils/request'
import { MenuResponseData, RoleData, RoleResponseData } from './type'
enum API {
	//获取全部已有的角色的接口
	ALLROLE_URL = '/admin/acl/role/',
	//新增角色
	ADDROLE_URL = '/admin/acl/role/save',
	//更新职位
	UPDATEROLE_URL = '/admin/acl/role/update',
	//获取全部的菜单和按钮的数据
	ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
	//给角色分配权限
	SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
}
export const reqAllRole = (page: number, limit: number, roleName: string) =>
	request.get<any, RoleResponseData>(`${API.ALLROLE_URL}${page}/${limit}?roleName=${roleName}`)
export const reqAddOrUpdateRole = (data: RoleData) => {
	if (data.id) {
		return request.put<any, any>(API.UPDATEROLE_URL, data)
	} else {
		return request.post<any, any>(API.ADDROLE_URL, data)
	}
}
export const reqAllPermission = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
	request.post<any, any>(`${API.SETPERMISSION_URL}roleId=${roleId}&permissionId=${permissionId}`)
