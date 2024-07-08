<template>
	<el-card>
		<el-table border style="margin: 10px 0" :data="skuArr">
			<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
			<el-table-column prop="skuName" label="名称" width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="skuDesc" label="描述" show-overflow-tooltip></el-table-column>
			<el-table-column label="图片" width="200">
				<template #default="scope">
					<img :src="scope.row.skuDefaultImg" height="100" alt="" />
				</template>
			</el-table-column>
			<el-table-column prop="weight" label="重量" width="150"></el-table-column>
			<el-table-column prop="price" label="价格" width="150"></el-table-column>
			<el-table-column label="操作" fixed="right" width="250">
				<template #default="scope">
					<el-button
						type="primary"
						size="small"
						@click="updateSale(scope.row)"
						:icon="scope.row.isSale == 1 ? 'Bottom' : 'Top'"
					></el-button>
					<el-button type="primary" size="small" icon="Edit" @click="updateSku()"></el-button>
					<el-button type="primary" size="small" icon="InfoFilled" @click="findSku(scope.row)"></el-button>
					<el-popconfirm :title="`你确定要删除${scope.row.skuName}吗`" width="200" @confirm="deleteSku(scope.row)">
						<template #reference>
							<el-button type="primary" size="small" icon="Delete"></el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="refPageNo"
			v-model:page-size="refPageSize"
			:page-sizes="[10, 20, 30, 40]"
			:background="true"
			layout="prev, pager, next, jumper,->,sizes,total"
			:total="refTotal"
			@size-change="handleSize"
			@current-change="getHasSku"
		/>
		<el-drawer v-model="drawer" direction="rtl">
			<template #header>
				<h4>查看商品的详情</h4>
			</template>
			<template #default>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">名称</el-col>
					<el-col :span="18">{{ skuInfo.skuName }}</el-col>
				</el-row>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">描述</el-col>
					<el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
				</el-row>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">价格</el-col>
					<el-col :span="18">{{ skuInfo.price }}</el-col>
				</el-row>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">平台属性</el-col>
					<el-col :span="18">
						<el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
							item.valueName
						}}</el-tag>
					</el-col>
				</el-row>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">销售属性</el-col>
					<el-col :span="18">
						<el-tag style="margin: 5px" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{
							item.saleAttrName
						}}</el-tag>
					</el-col>
				</el-row>
				<el-row style="margin: 10px 0px">
					<el-col :span="6">商品图片</el-col>
					<el-col :span="18">
						<el-carousel :interval="4000" type="card" height="200px">
							<el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
								<img :src="item.imgUrl" alt="" width="100%" height="100%" />
							</el-carousel-item>
						</el-carousel>
					</el-col>
				</el-row>
			</template>
		</el-drawer>
	</el-card>
</template>
<script setup lang="ts">
	import { reqSkuList, reqCancelSaleSku, reqSaleSku, reqSkuInfo, reqDeleteSku } from '@/api/product/sku'
	import { SkuData } from '@/api/product/sku/type'
	import { ElMessage } from 'element-plus'
	import { onMounted, ref } from 'vue'

	let refPageNo = ref(1)
	let refPageSize = ref(10)
	let refTotal = ref(40)
	let skuArr = ref<SkuData[]>([])
	let drawer = ref(false)
	let skuInfo = ref<any>({})
	const getHasSku = async (pager = 1) => {
		refPageNo.value = pager
		const res = await reqSkuList(refPageNo.value, refPageSize.value)
		if (res) {
			skuArr.value = res.data.records
			refTotal.value = res.data.total
		}
	}
	const handleSize = () => {
		getHasSku()
	}
	/**
	 *
	 * @param row.isSale 1:上架 0 下降
	 */
	const updateSale = async (row: SkuData) => {
		//当前为上架状态需要变成下架
		if (row.isSale == 1) {
			const res = await reqCancelSaleSku(row.id as number)
			if (res) {
				ElMessage.success('商品下架成功')
				getHasSku(refPageNo.value)
			}
		} else {
			const res = await reqSaleSku(row.id as number)
			if (res) {
				ElMessage.success('商品上架成功')
				getHasSku(refPageNo.value)
			}
		}
	}
	const updateSku = () => {
		ElMessage.success('开发中....')
	}
	const findSku = async (row: SkuData) => {
		drawer.value = true
		const res = await reqSkuInfo(row.id as number)
		if (res) {
			skuInfo.value = res.data
		}
	}
	const deleteSku = async (row: SkuData) => {
		const res = await reqDeleteSku(row.id as number)
		if (res) {
			ElMessage.success('删除成功')
			getHasSku(skuArr.value.length > 1 ? refPageNo.value : refPageNo.value - 1)
		}
	}
	onMounted(() => {
		getHasSku()
	})
</script>
<style scoped lang="scss">
	.el-carousel__item h3 {
		color: #475669;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
		text-align: center;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
