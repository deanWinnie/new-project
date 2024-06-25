import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type'

enum API {
	//获取已有品牌的接口
	TRADEMARK_URL = '/admin/product/baseTrademark/',
	//添加品牌
	ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
	// 修改已有的品牌
	UPDATETADEMARK_URL = '/admin/product/baseTrademark/update',
	//删除已有品牌
	DETELE_URL = '/admin/product/deleteSku/',
}

export const reqHasTradeMark = (page: number, limit: number) =>
	request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加与修改已有品牌的接口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
	if (data.id) {
		//修改
		return request.put<any, any>(API.UPDATETADEMARK_URL, data)
	} else {
		//添加
		return request.post<any, any>(API.ADDTRADEMARK_URL, data)
	}
}
//删除品牌
export const reqDeleteTradeMark = (id: number) => request.delete(API.DETELE_URL + id)
