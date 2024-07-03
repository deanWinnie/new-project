<template>
	<div>
		<Category :scene="refScene"></Category>
	</div>
	<el-card style="margin: 10px 0">
		<div v-show="refScene == 0">
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
						<el-button type="primary" size="small" icon="Edit" @click="updateAttr(scope.row)"></el-button>
						<el-popconfirm
							confirm-button-text="确定"
							cancel-button-text="取消"
							icon="Delete"
							icon-color="red"
							:title="`您确定要删除${scope.row.attrName}?`"
							@confirm="deleteAttr(scope.row.id)"
							width="250"
						>
							<template #reference>
								<el-button type="primary" size="small" icon="Delete"></el-button>
							</template>
						</el-popconfirm>
						<!-- <el-button type="primary" size="small" icon="Delete" @click="deleteAttr(scope.row.id)"></el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-show="refScene == 1">
			<el-form :inline="true">
				<el-form-item label="属性名称">
					<el-input v-model="attrParams.attrName"></el-input>
				</el-form-item>
			</el-form>
			<el-button icon="Plus" type="primary" @click="addAttrValue" :disabled="!attrParams.attrName"
				>添加属性值</el-button
			>
			<el-button type="primary" @click="cancel">取消</el-button>
			<el-table style="margin: 10px 0" :data="attrParams.attrValueList">
				<el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
				<el-table-column label="属性值名称" prop="attrName">
					<template #default="scope">
						<el-input
							:ref="(vc: any) => (refInputArr[scope.$index] = vc)"
							v-if="scope.row.flag"
							placeholder="请输入属性值名称"
							v-model="scope.row.valueName"
							@blur="toLook(scope.row, scope.$index)"
						></el-input>
						<div v-else @click="toEdit(scope.row, scope.$index)">
							{{ scope.row.valueName }}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="属性值操作">
					<template #default="scope">
						<el-button
							icon="Delete"
							size="small"
							type="primary"
							@click="attrParams.attrValueList.splice(scope.$index, 1)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length == 0">保存</el-button>
			<el-button type="primary" @click="cancel">取消</el-button>
		</div>
	</el-card>
</template>
<script lang="ts">
	export default {
		name: 'attr',
	}
</script>
<script setup lang="ts">
	import useCategoryStore from '@/store/module/category'
	import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
	import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
	import type { Attr, AttrValue } from '@/api/product/attr/type'
	import { ElMessage } from 'element-plus'
	const categoryStore = useCategoryStore()
	let refAttrList = ref<Attr[]>([])
	let refScene = ref(0)
	let attrParams = reactive<Attr>({
		attrName: '',
		attrValueList: [],
		categoryId: '',
		categoryLevel: 3,
	})
	let refInputArr = ref<any>([])
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
		refScene.value = 1
		Object.assign(attrParams, {
			attrName: '',
			attrValueList: [],
			categoryId: categoryStore.c3Id,
			categoryLevel: 3,
		})
		delete attrParams.id
	}
	//添加属性值
	const addAttrValue = () => {
		attrParams.attrValueList.push({
			valueName: '',
			flag: true, //控制每个属性值的输入和展示
		})
		nextTick(() => {
			refInputArr.value[attrParams.attrValueList.length - 1].focus()
		})
	}
	const updateAttr = (row: Attr) => {
		refScene.value = 1
		//attrParams = row  这个方式导致attrParams失去响应式
		Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
	}
	const deleteAttr = async (attrId: number) => {
		const res = await reqDeleteAttr(attrId)
		if (res) {
			ElMessage.success('删除属性成功')
		}
		getAttr()
	}
	const save = async () => {
		const res = await reqAddOrUpdateAttr(attrParams)
		if (res) {
			refScene.value = 0
			ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
		}
		getAttr()
	}
	const toLook = (row: AttrValue, $index: number) => {
		if (row.valueName.trim() == '') {
			//删除属性值为空的元素
			attrParams.attrValueList.splice($index, 1)
			ElMessage.error('属性值不能为空')
			return
		}
		const repeat = attrParams.attrValueList.find((item) => {
			if (item != row) {
				return item.valueName === row.valueName
			}
		})
		if (repeat) {
			attrParams.attrValueList.splice($index, 1)
			ElMessage.error('属性值不能重复')
			return
		}
		row.flag = false
	}
	const toEdit = (row: AttrValue, $index: number) => {
		row.flag = true
		nextTick(() => {
			refInputArr.value[$index].focus()
		})
	}
	const cancel = () => {
		refScene.value = 0
	}
	onBeforeUnmount(() => {
		categoryStore.$reset()
	})
</script>
<style scoped lang="scss"></style>
