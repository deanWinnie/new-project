//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}
//已有的品牌的ts的数据类型
export interface TradeMark {
	id?: number
	tmName: string
	logoUrl: string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[]

export interface TradeMarkResponseData extends ResponseData {
	data: {
		records: Records
		total: number
		size: number
		current: number
		searchCount: boolean
		pages: number
	}
}
