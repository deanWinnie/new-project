<template>
	<div>
		<Category :scene="refScene"></Category>
		<el-card style="margin: 10px 0">
			<div v-show="refScene == 0">
				<el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addSpu">添加SPU</el-button>
				<el-table style="margin: 10px 0" border :data="refRecords">
					<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
					<el-table-column label="SPU名称" prop="spuName"></el-table-column>
					<el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作">
						<template #default="scope">
							<el-button size="small" type="primary" icon="Plus" title="添加SKU" @click="addSku(scope.row)"></el-button>
							<el-button
								size="small"
								type="primary"
								icon="Edit"
								title="修改SPU"
								@click="updateSpu(scope.row)"
							></el-button>
							<el-button
								size="small"
								type="primary"
								@click="findSku(scope.row)"
								icon="View"
								title="查看SKU列表"
							></el-button>
							<el-popconfirm :title="`你确定要删除${scope.row.spuName}吗`" width="200" @confirm="removeSpu(scope.row)">
								<template #reference>
									<el-button size="small" type="primary" icon="Delete" title="删除SKU"></el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					v-model:current-page="refPageNo"
					v-model:page-size="refPageSize"
					:page-sizes="[3, 5, 7, 9]"
					:background="true"
					layout="prev, pager, next, jumper,->,sizes,total"
					:total="refTotal"
					@size-change="handleSize"
					@current-change="getHasSpu"
				/>
			</div>
			<!-- 添加SPU|修改SPU的子组件 -->
			<SpuForm ref="spu" v-show="refScene == 1" @changeScene="changeScene"></SpuForm>
			<!-- 添加SKU的子组件 -->
			<SkuForm ref="sku" v-show="refScene == 2" @changeScene="changeScene"></SkuForm>
			<el-dialog title="SKU列表" v-model="show">
				<el-table border :data="skuArr">
					<el-table-column label="SKU名字" prop="skuName"></el-table-column>
					<el-table-column label="SKU价格" prop="price"></el-table-column>
					<el-table-column label="SKU的重量" prop="weight"></el-table-column>
					<el-table-column label="SKU图片" prop="weight">
						<template #default="scope">
							<img :src="scope.row.skuDefaultImg" height="100" alt="" />
						</template>
					</el-table-column>
				</el-table>
			</el-dialog>
		</el-card>
	</div>
</template>
<script setup lang="ts">
	import { onBeforeUnmount, ref, watch } from 'vue'
	import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
	import useCategoryStore from '@/store/module/category'
	import type { SkuData, SpuData } from '@/api/product/spu/type'
	import SpuForm from './spuForm.vue'
	import SkuForm from './skuForm.vue'
	import { ElMessage } from 'element-plus'
	const categoryStore = useCategoryStore()
	let refScene = ref(0)
	//分页器默认页码
	let refPageNo = ref(1)
	//每一页展示几条数据
	let refPageSize = ref(3)
	//数据总数
	let refTotal = ref(0)
	let refRecords = ref<SpuData[]>([])
	const spu = ref<any>()
	const sku = ref<any>()
	let skuArr = ref<SkuData[]>([])
	let show = ref(false)
	watch(
		() => categoryStore.c3Id,
		() => {
			if (categoryStore.c3Id) {
				getHasSpu()
			}
		},
	)
	const getHasSpu = async (pager = 1) => {
		refPageNo.value = pager
		const res = await reqHasSpu(refPageNo.value, refPageSize.value, categoryStore.c3Id)
		if (res) {
			refRecords.value = res.data.records
			refTotal.value = res.data.total
		}
	}
	const handleSize = () => {
		getHasSpu()
	}
	const addSpu = () => {
		refScene.value = 1
		spu.value.initReset(categoryStore.c3Id)
	}
	//子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景为0
	const changeScene = ({ flag, params }: any) => {
		refScene.value = flag
		if (params == 'update') {
			getHasSpu(refPageNo.value)
		} else {
			getHasSpu()
		}
	}
	const updateSpu = async (row: SpuData) => {
		refScene.value = 1
		//调用子组件的方法
		spu.value.initHasSpuData(row)
	}
	const addSku = (row: SpuData) => {
		refScene.value = 2
		sku.value.initSkuData(categoryStore.c3Id, categoryStore.c2Id, row)
	}
	const findSku = async (row: SpuData) => {
		const res = await reqSkuList(row.id as number)
		if (res) {
			skuArr.value = res.data
			show.value = true
		}
	}
	const removeSpu = async (row: SpuData) => {
		const res = await reqRemoveSpu(row.id as number)
		if (res) {
			ElMessage.success('删除成功')
			getHasSpu(refRecords.value.length == 1 ? refPageNo.value - 1 : refPageNo.value)
		}
	}
	onBeforeUnmount(() => {
		categoryStore.$reset()
	})
</script>
<style scoped lang="scss"></style>
