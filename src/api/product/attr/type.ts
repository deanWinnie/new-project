//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface CategoryObj {
	id: number | string
	name: string
	category1Id?: number
	category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
	data: CategoryObj[]
}

export interface AttrValue {
	id: number
	valueName: string
	attrId: number
}

export interface Attr {
	id: number
	attrName: string
	categoryId: number
	categoryLevel: number
	attrValueList: AttrValue[]
}

export interface AttrResponseDate extends ResponseData {
	data: Attr[]
}
