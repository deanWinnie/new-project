<template>
	<div>
		<Category :scene="refScene"></Category>
	</div>
	<el-card style="margin: 10px 0">
		<div v-show="refScene">
			<el-button icon="Plus" type="primary" :disabled="!categoryStore.c3Id" @click="addAttr">添加平台属性</el-button>
			<el-table style="margin: 10px 0" :data="refAttrList">
				<el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
				<el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
				<el-table-column label="属性值名称">
					<template #default="scope">
						<el-tag style="margin: 5px" v-for="item in scope.row.attrValueList" :key="item.id">{{
							item.valueName
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120px">
					<template #default="scope">
						<el-button type="primary" size="small" icon="Edit" @click="updateAttr"></el-button>
						<el-button type="primary" size="small" icon="Delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-show="!refScene">
			<el-form :inline="true">
				<el-form-item label="属性名称">
					<el-input></el-input>
				</el-form-item>
			</el-form>
			<el-button icon="Plus" type="primary" @click="addAttr">添加属性值</el-button>
			<el-button type="primary" @click="cancel">取消</el-button>
			<el-table style="margin: 10px 0">
				<el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
				<el-table-column label="属性值名称" prop="attrName"></el-table-column>
				<el-table-column label="属性值操作"></el-table-column>
			</el-table>
			<el-button type="primary" @click="addAttr">保存</el-button>
			<el-button type="primary" @click="cancel">取消</el-button>
		</div>
	</el-card>
</template>
<script setup lang="ts">
	import useCategoryStore from '@/store/module/category'
	import { ref, watch } from 'vue'
	import { reqAttr } from '@/api/product/attr'
	import type { Attr } from '@/api/product/attr/type'
	const categoryStore = useCategoryStore()
	let refAttrList = ref<Attr[]>([])
	let refScene = ref(true)
	watch(
		() => categoryStore.c3Id,
		() => {
			if (categoryStore.c3Id) {
				getAttr()
			}
		},
	)
	const getAttr = async () => {
		const { c1Id, c2Id, c3Id } = categoryStore
		const res = await reqAttr(c1Id as number, c2Id as number, c3Id as number)
		if (res) {
			refAttrList.value = res.data
		}
	}
	const addAttr = () => {
		refScene.value = false
	}
	const updateAttr = () => {
		refScene.value = false
	}
	const cancel = () => {
		refScene.value = true
	}
</script>
<style scoped lang="scss"></style>
