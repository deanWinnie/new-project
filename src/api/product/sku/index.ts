import request from '@/utils/request'
import request2 from '@/utils/request2'
import type { SkuResponseData, SkuInfoData } from './type'
enum API {
	//商品数据
	SKU_URL = '/admin/product/list/',
	//商品上架、
	SALE_URL = '/admin/product/onSale/',
	//商品下架
	CANCELSALE_URL = '/admin/product/cancelSale/',
	//商品详情
	SKUINFO_URL = '/admin/product/getSkuById/',
	//商品删除
	DELETESKU_URL = '/admin/product/deleteSku/',
}
export const reqSkuList = (page: number, limit: number) =>
	request2.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`)
export const reqSaleSku = (skuId: number) => request2.get<any, any>(API.SALE_URL + skuId)
export const reqCancelSaleSku = (skuId: number) => request2.get<any, any>(API.CANCELSALE_URL + skuId)
export const reqSkuInfo = (skuId: number) => request2.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
export const reqDeleteSku = (skuId: number) => request2.delete<any, any>(API.DELETESKU_URL + skuId)
