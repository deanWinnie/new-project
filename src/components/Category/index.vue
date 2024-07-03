<template>
	<el-card>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="一级分类">
				<el-select v-model="categoryStore.c1Id" @change="getC2" :disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c1List"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="二级分类">
				<el-select v-model="categoryStore.c2Id" @change="getC3" :disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c2List"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="三级分类">
				<el-select v-model="categoryStore.c3Id" :disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c3List"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script setup lang="ts">
	import { onMounted } from 'vue'
	import useCategoryStore from '@/store/module/category'
	const categoryStore = useCategoryStore()
	onMounted(() => {
		getC1()
	})
	const getC1 = () => {
		categoryStore.getC1()
	}
	const getC2 = () => {
		categoryStore.c2Id = ''
		categoryStore.c2List = []
		categoryStore.c3Id = ''
		categoryStore.c3List = []
		categoryStore.getC2()
	}
	const getC3 = () => {
		categoryStore.c3Id = ''
		categoryStore.c3List = []
		categoryStore.getC3()
	}

	//接受父组件传递过来的参数
	defineProps({
		//xlink:href属性值的前缀
		scene: {
			type: Number,
		},
	})
</script>
<style scope>
	.demo-form-inline .el-input {
		--el-input-width: 220px;
	}

	.demo-form-inline .el-select {
		--el-select-width: 220px;
	}
</style>
