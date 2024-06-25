import request from '@/utils/request'
import request2 from '@/utils/request2'
import type { CategoryResponseData, AttrResponseDate } from './type'
enum API {
	//1级分类的请求地址
	C1_URL = '/admin/product/getCategory1',
	//2级分类的请求地址
	C2_URL = '/admin/product/getCategory2/',
	//3级分类的请求地址
	C3_URL = '/admin/product/getCategory3/',
	//获取分类下已有的属性与属性值
	ATTR_URL = '/admin/product/attrInfoList/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (c1Id: number) => request.get<any, CategoryResponseData>(API.C2_URL + c1Id)
export const reqC3 = (c2Id: number) => request.get<any, CategoryResponseData>(API.C3_URL + c2Id)
export const reqAttr = (c1Id: number, c2Id: number, c3Id: number) =>
	request2.get<any, AttrResponseDate>(`${API.ATTR_URL}${c1Id}/${c2Id}/${c3Id}`)
