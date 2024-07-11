import request from '@/utils/request'
import { MenuParams, PermissionResponse } from './type'
enum API {
	//获取全部菜单数据
	ALLPERMISSION_URL = '/admin/acl/permission',
	//新增菜单
	ADDPERMISSION_URL = '/admin/acl/permission/save',
	//修改菜单
	UPDATEPERMISSION_URL = '/admin/acl/permission/update',
	//删除已有的菜单
	DELETEPERMISSION_URL = '/admin/acl/permission/remove/',
}
export const reqAllPermission = () => request.get<any, PermissionResponse>(API.ALLPERMISSION_URL)
export const reqAddOrUpdatePermission = (data: MenuParams) => {
	if (data.id) {
		return request.put<any, any>(API.UPDATEPERMISSION_URL, data)
	} else {
		return request.post<any, any>(API.ADDPERMISSION_URL, data)
	}
}
export const reqDeletePermission = (id: number) => request.delete<any, any>(API.DELETEPERMISSION_URL + id)
