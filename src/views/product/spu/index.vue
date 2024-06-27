<template>
	<div>
		<Category :scene="refScene"></Category>
		<el-card style="margin: 10px 0">
			<el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">添加SPU</el-button>
			<el-table style="margin: 10px 0" border :data="refRecords">
				<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
				<el-table-column label="SPU名称" prop="spuName"></el-table-column>
				<el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" type="primary" icon="Plus" title="添加SKU"></el-button>
						<el-button size="small" type="primary" icon="Edit" title="修改SKU"></el-button>
						<el-button size="small" type="primary" icon="View" title="查看SKU列表"></el-button>
						<el-button size="small" type="primary" icon="Delete" title="删除SKU"></el-button>
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
		</el-card>
	</div>
</template>
<script setup lang="ts">
	import { ref, watch } from 'vue'
	import { reqHasSpu } from '@/api/product/spu'
	import useCategoryStore from '@/store/module/category'
	import type { SpuData } from '@/api/product/spu/type'
	const categoryStore = useCategoryStore()
	let refScene = ref(true)
	//分页器默认页码
	let refPageNo = ref(1)
	//每一页展示几条数据
	let refPageSize = ref(3)
	//数据总数
	let refTotal = ref(0)
	let refRecords = ref<SpuData[]>([])
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
</script>
<style scoped lang="scss"></style>
