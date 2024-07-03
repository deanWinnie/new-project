import request from '@/utils/request'
import request2 from '@/utils/request2'
import type {
	HasSpuResponseData,
	AllTradeMark,
	SpuHasImage,
	SaleAttrResponseData,
	HasSaleAttrResponseData,
	SpuData,
} from './type'
enum API {
	//获已有spu的数据
	HASSPU_URL = '/admin/product/',
	//添加或者修改已有的属性的接口
	ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
	//获取某个SPU下的全部的售卖商品的图片数据
	IMAGE_URL = '/admin/product/spuImageList/',
	//获取某一个SPU下全部的已有的销售属性的接口
	SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
	//获取整个项目的全部销售属性
	ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
	//新增一个SPU
	ADDSPU_URL = '/admin/product/saveSpuInfo',
	//修改SPU
	UPDATESPU_URL = '/admin/product/updateSpuInfo',
}
export const reqHasSpu = (page: number, limit: number, c3Id: string | number) => {
	return request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${c3Id}`)
}
export const reqAllTradMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
export const reqSPUImage = (spuId: number) => request.get<any, SpuHasImage>(API.IMAGE_URL + spuId)
export const reqSpuHasSaleAttr = (spuId: number) =>
	request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
export const reqAddOrUpdateSpu = (data: SpuData) => {
	if (data.id) {
		return request.post<any, any>(API.UPDATESPU_URL, data)
	} else {
		return request.post<any, any>(API.ADDSPU_URL, data)
	}
}