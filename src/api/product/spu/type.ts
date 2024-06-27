//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface SpuData {
	id?: number
	spuName: string
	description: string
	category3Id: string | number
	tmId: number
	spuSaleAttrList: null
	spuImageList: null
}

export interface HasSpuResponseData extends ResponseData {}
