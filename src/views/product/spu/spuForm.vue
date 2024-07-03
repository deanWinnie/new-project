<template>
	<el-form label-width="100">
		<el-form-item label="SPU名称">
			<el-input v-model="spuParams.spuName"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParams.tmId">
				<el-option v-for="item in tradeMarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParams.description"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload
				v-model:file-list="imgList"
				action="/api/admin/product/fileUpload"
				list-type="picture-card"
				:on-preview="handlePictureCardPreview"
				:before-upload="beforeUpload"
			>
				<el-icon><Plus /></el-icon>
			</el-upload>

			<el-dialog v-model="dialogVisible">
				<img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select
				v-model="saleAttrIdAndValueName"
				:placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
			>
				<el-option
					v-for="item in unSelectSaleAttr"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`"
				></el-option>
			</el-select>
			<el-button
				:disabled="!saleAttrIdAndValueName"
				icon="Plus"
				type="primary"
				style="margin-left: 10px"
				@click="addSaleAttr"
				>添加属性值</el-button
			>
			<el-table border style="margin: 10px 0" :data="saleAttr">
				<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
				<el-table-column label="属性名" prop="saleAttrName" width="120"></el-table-column>
				<el-table-column label="属性值">
					<template #default="scope">
						<el-tag
							style="margin: 5px"
							@close="scope.row.spuSaleAttrValueList.splice(index, 1)"
							v-for="(item, index) in scope.row.spuSaleAttrValueList"
							closable
							:key="item.id"
							>{{ item.saleAttrValueName }}</el-tag
						>
						<el-input
							v-if="scope.row.flag"
							@change="toLook(scope.row)"
							v-model="scope.row.saleAttrValue"
							placeholder="请输入属性值"
							size="small"
							style="width: 100px"
						></el-input>
						<el-button v-else icon="Plus" type="primary" size="small" @click="toEdit(scope.row)"></el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120">
					<template #default="scope">
						<el-button icon="Delete" type="primary" size="small" @click="saleAttr.splice(scope.$index, 1)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<el-form-item>
			<el-button :disabled="!(saleAttr.length > 0)" type="primary" @click="save">保存</el-button>
			<el-button type="primary" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script setup lang="ts">
	import type {
		SpuData,
		AllTradeMark,
		SpuHasImage,
		SaleAttrResponseData,
		HasSaleAttrResponseData,
		TradeMark,
		SpuImage,
		SaleAttr,
		HasSaleAttr,
	} from '@/api/product/spu/type'
	import { reqAllTradMark, reqSPUImage, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
	import { computed, ref } from 'vue'
	import { ElMessage, UploadProps } from 'element-plus'
	const $emit = defineEmits(['changeScene'])
	const cancel = () => {
		$emit('changeScene', { flag: 0, params: spuParams.value.id ? 'update' : 'add' })
	}
	let tradeMarkList = ref<TradeMark[]>([])
	let imgList = ref<SpuImage[]>([])
	let saleAttr = ref<SaleAttr[]>([])
	let allSaleAttr = ref<HasSaleAttr[]>([])
	let spuParams = ref<SpuData>({
		spuName: '',
		category3Id: '',
		description: '',
		tmId: '',
		spuImageList: [],
		spuSaleAttrList: [],
	})
	let dialogVisible = ref(false)
	let dialogImageUrl = ref('')
	let saleAttrIdAndValueName = ref('')
	const initHasSpuData = async (spu: SpuData) => {
		spuParams.value = spu
		const res: AllTradeMark = await reqAllTradMark()
		const res1: SpuHasImage = await reqSPUImage(spu.id as number)
		const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
		const res3: HasSaleAttrResponseData = await reqAllSaleAttr()
		tradeMarkList.value = res.data
		imgList.value = res1.data.map((item) => {
			return {
				name: item.imgName,
				url: item.imgUrl,
			}
		})
		saleAttr.value = res2.data
		allSaleAttr.value = res3.data
	}
	const handlePictureCardPreview = (file: any) => {
		dialogVisible.value = true
		dialogImageUrl.value = file.url
	}
	const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
		if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
			ElMessage.error('上传文件的格式必须是PNG|JPG|GIF')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('图片不能超过2MB')
			return false
		}
		return true
	}
	let unSelectSaleAttr = computed(() => {
		let res = allSaleAttr.value.filter((item) => {
			return saleAttr.value.every((data) => {
				return item.name != data.saleAttrName
			})
		})
		return res
	})
	const addSaleAttr = () => {
		const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')

		saleAttr.value.push({
			baseSaleAttrId,
			saleAttrName,
			spuSaleAttrValueList: [],
		})
		saleAttrIdAndValueName.value = ''
	}
	const toEdit = (row: SaleAttr) => {
		row.flag = true
		row.saleAttrValue = ''
	}
	const toLook = (row: SaleAttr) => {
		const { baseSaleAttrId, saleAttrValue } = row
		if ((saleAttrValue as string).trim() == '') {
			ElMessage.error('属性值不能为空的')
			return
		}
		const repeat = row.spuSaleAttrValueList.find((item) => {
			return item.saleAttrValueName == saleAttrValue
		})
		if (repeat) {
			ElMessage.error('属性值名称不能重复')
			return
		}
		row.spuSaleAttrValueList.push({
			baseSaleAttrId,
			saleAttrValueName: saleAttrValue as string,
		})
		row.saleAttrValue = ''
		row.flag = false
	}
	const save = async () => {
		spuParams.value.spuImageList = imgList.value.map((item: any) => {
			return {
				imgName: item.name,
				imgUrl: (item.response && item.response.data) || item.url,
			}
		})
		spuParams.value.spuSaleAttrList = saleAttr.value
		const res = await reqAddOrUpdateSpu(spuParams.value)
		if (res) {
			ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
			cancel()
		}
	}
	const initReset = async (c3Id: number) => {
		spuParams.value = {
			spuName: '',
			category3Id: '',
			description: '',
			tmId: '',
			spuImageList: [],
			spuSaleAttrList: [],
		}
		imgList.value = []
		saleAttr.value = []
		saleAttrIdAndValueName.value = ''
		spuParams.value.category3Id = c3Id
		const res: AllTradeMark = await reqAllTradMark()
		const res1: HasSaleAttrResponseData = await reqAllSaleAttr()
		tradeMarkList.value = res.data
		allSaleAttr.value = res1.data
	}
	//如果想要父组件调用子组件的方法需要暴漏
	defineExpose({ initHasSpuData, initReset })
</script>
<style scoped>
	.el-select {
		--el-select-width: 220px;
	}
</style>
