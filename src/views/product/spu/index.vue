<template>
	<div>
		<Category :scene="refScene"></Category>
		<el-card style="margin: 10px 0">
			<el-button type="primary" icon="Plus">添加SPU</el-button>
			<el-table style="margin: 10px 0" border>
				<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
				<el-table-column label="SPU名称"></el-table-column>
				<el-table-column label="SPU描述"></el-table-column>
				<el-table-column label="操作"></el-table-column>
			</el-table>
			<el-pagination
				v-model:current-page="refPageNo"
				v-model:page-size="refPageSize"
				:page-sizes="[3, 5, 7, 9]"
				:background="true"
				layout="prev, pager, next, jumper,->,sizes,total"
				:total="refTotal"
				@size-change="handleSize"
				@current-change="getHasTradeMark"
			/>
		</el-card>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	import { reqHasSpu } from '@/api/product/spu'
	let refScene = ref(true)
	//分页器默认页码
	let refPageNo = ref(1)
	//每一页展示几条数据
	let refPageSize = ref(3)
	//数据总数
	let refTotal = ref(200)
</script>
<style scoped lang="scss"></style>
