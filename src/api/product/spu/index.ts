import request from '@/utils/request'
import request2 from '@/utils/request2'
import type { HasSpuResponseData } from './type'
enum API {
	//获已有spu的数据
	HASSPU_URL = '/admin/product/',
	//添加或者修改已有的属性的接口
	ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
	//删除属性的接口
	DELETEATTR_URL = '/admin/product/deleteAttr/',
}
export const reqHasSpu = (page: number, limit: number, c3Id: string | number) => {
	return request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${c3Id}`)
}
