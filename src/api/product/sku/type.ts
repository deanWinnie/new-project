//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface Attr {
	attrId: string | number
	valueId: string | number
	id: string | number
	valueName: string | number
}
export interface SaleList {
	saleAttrId: string | number
	saleAttrValueId: string | number
	saleAttrName: string | number
	id: string | number
}
export interface SkuData {
	category3Id?: string | number
	spuId?: string | number
	tmId?: string | number
	skuName?: string
	price?: string | number
	weight?: string | number
	skuDesc?: string
	skuAttrValueList?: Attr[]
	skuSaleAttrValueList?: SaleList[]
	skuDefaultImg?: string
	isSale?: number
	id?: string | number
}
//获取SKU接口返回的数据类型
export interface SkuResponseData extends ResponseData {
	data: {
		records: SkuData[]
		total: number
		size: number
		current: number
		orders: []
		optimizeCountSql: boolean
		hitCount: boolean
		countId: null
		maxLimit: null
		searchCount: boolean
		pages: number
	}
}

export interface SkuInfoData extends ResponseData {
	data: SkuData[]
}
