<template>
	<el-form label-width="100">
		<el-form-item label="sku名称">
			<el-input v-model="skuParams.skuName"></el-input>
		</el-form-item>
		<el-form-item label="价格(元)">
			<el-input type="number" v-model="skuParams.price"></el-input>
		</el-form-item>
		<el-form-item label="重量(克)">
			<el-input type="number" v-model="skuParams.weight"></el-input>
		</el-form-item>
		<el-form-item label="sku描述">
			<el-input type="textarea" v-model="skuParams.skuDesc"></el-input>
		</el-form-item>
		<el-form-item label="平台属性">
			<el-form inline="true">
				<el-form-item v-for="item in attrArr" :label="item.attrName" :key="item.id">
					<el-select v-model="item.attrIdAndValueId">
						<el-option
							v-for="attrValue in item.attrValueList"
							:key="attrValue.id"
							:label="attrValue.valueName"
							:value="`${item.id}:${attrValue.id}`"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-form-item>
		<el-form-item label="销售属性">
			<el-form inline="true">
				<el-form-item v-for="item in saleAttr" :label="item.saleAttrName" :key="item.id">
					<el-select v-model="item.saleIdAndValueId">
						<el-option
							v-for="spuSaleAttrValue in item.spuSaleAttrValueList"
							:key="spuSaleAttrValue.id"
							:label="spuSaleAttrValue.saleAttrValueName"
							:value="`${item.id}:${spuSaleAttrValue.id}`"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-form-item>
		<el-form-item label="图片名称">
			<el-table border :data="imgArr" ref="table">
				<el-table-column type="selection" width="55" />
				<el-table-column label="图片">
					<template #default="scope">
						<img :src="scope.row.imgUrl" alt="" height="100" />
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="imgName"></el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" type="primary" @click="handle(scope.row)">设置默认</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="save">保存</el-button>
			<el-button type="primary" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script setup lang="ts">
	import { reqAttr } from '@/api/product/attr'
	import { reqSPUImage, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
	import { reactive, ref } from 'vue'
	import type { SkuData, SpuImage } from '@/api/product/spu/type'
	import { ElMessage } from 'element-plus'
	const $emit = defineEmits(['changeScene'])
	const cancel = () => {
		$emit('changeScene', { flag: 0, params: '' })
	}
	let attrArr = ref<any>([])
	let saleAttr = ref<any>([])
	let imgArr = ref<any>([])
	const table = ref()
	const skuParams = reactive<SkuData>({
		category3Id: '',
		spuId: '',
		tmId: '',
		skuName: '',
		price: '',
		weight: '',
		skuDesc: '',
		skuAttrValueList: [],
		skuSaleAttrValueList: [],
		skuDefaultImg: '',
	})
	const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
		skuParams.category3Id = spu.category3Id
		skuParams.spuId = spu.id
		skuParams.tmId = spu.tmId
		const res = await reqAttr(c1Id as number, c2Id as number, spu.category3Id)
		const res1 = await reqSPUImage(spu.id)
		const res2 = await reqSpuHasSaleAttr(spu.id)
		attrArr.value = res.data
		saleAttr.value = res2.data
		imgArr.value = res1.data
	}
	const handle = (row: SpuImage) => {
		imgArr.value.forEach((item: SpuImage) => {
			table.value.toggleRowSelection(item, false)
		})
		table.value.toggleRowSelection(row, true)
		skuParams.skuDefaultImg = row.imgUrl as string
	}
	const save = async () => {
		//平台属性
		skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
			if (next.attrIdAndValueId) {
				let [attrId, valueId] = next.attrIdAndValueId.split(':')
				prev.push({
					attrId,
					valueId,
				})
			}
			return prev
		}, [])
		//销售属性
		skuParams.skuSaleAttrValueList = saleAttr.value.reduce((prev: any, next: any) => {
			if (next.saleIdAndValueId) {
				let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
				prev.push({
					saleAttrId,
					saleAttrValueId,
				})
			}
			return prev
		}, [])
		const res = await reqAddSku(skuParams)
		if (res) {
			ElMessage.success('新增成功')
			$emit('changeScene', { flag: 0, params: '' })
		}
	}
	defineExpose({ initSkuData })
</script>
<style scoped>
	.el-select {
		--el-select-width: 220px;
	}
</style>
