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
	tmId: string | number
	spuSaleAttrList: null | SaleAttr[]
	spuImageList: null | SpuImage[]
}

export interface HasSpuResponseData extends ResponseData {
	data: {
		records: SpuData[]
		total: number
		size: number
		current: number
		searchCount: boolean
		pages: number
	}
}

//品牌数据的TS类型
export interface TradeMark {
	id: number
	tmName: string
	logoUrl: string
}
//品牌接口返回的数据ts类型
export interface AllTradeMark extends ResponseData {
	data: TradeMark[]
}
//商品图片的Ts类型
export interface SpuImage {
	id?: number
	createTime?: string
	updateTime?: string
	spuId?: number
	imgName?: string
	imgUrl?: string
	name?: string
	url?: string
}
//已有的SPU的照片墙数据的类型
export interface SpuHasImage extends ResponseData {
	data: SpuImage[]
}
//已有的销售属性对象的ts类型
export interface SaleAttrValue {
	id?: number
	createTime?: null
	updateTime?: null
	spuId?: number
	baseSaleAttrId: number | string
	saleAttrValueName: string
	saleAttrName?: string
	isChecked?: null
}
//销售属性对象TS类型
export interface SaleAttr {
	id?: number
	createTime?: null
	updateTime?: null
	spuId?: number
	baseSaleAttrId: number | string
	saleAttrName: string
	spuSaleAttrValueList: SaleAttrValue[]
	flag?: boolean
	saleAttrValue?: string
}
//Spu已有的销售属性接口返回的ts数据类型
export interface SaleAttrResponseData extends ResponseData {
	data: SaleAttr[]
}
//已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
	id: number
	name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
	data: HasSaleAttr[]
}
export interface Attr {
	attrId: string | number
	valueId: string | number
}
export interface SaleList {
	saleAttrId: string | number
	saleAttrValueId: string | number
}
export interface SkuData {
	category3Id: string | number
	spuId: string | number
	tmId: string | number
	skuName: string
	price: string | number
	weight: string | number
	skuDesc: string
	skuAttrValueList?: Attr[]
	skuSaleAttrValueList?: SaleList[]
	skuDefaultImg: string
}
