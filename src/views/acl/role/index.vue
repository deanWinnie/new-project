<template>
	<el-card style="height: 80px">
		<el-form :inline="true" class="form">
			<el-form-item label="角色名称">
				<el-input v-model="keyword"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">搜索</el-button>
				<el-button type="primary" @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
	<el-card style="margin: 10px 0">
		<el-button type="primary" @click="addRole">添加角色</el-button>
		<el-table style="margin: 10px 0" border :data="roleArr">
			<el-table-column type="index" label="#" align="center"></el-table-column>
			<el-table-column label="id" align="center" prop="id"></el-table-column>
			<el-table-column label="角色名称" show-overflow-tooltip align="center" prop="roleName"></el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
			<el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
			<el-table-column label="操作" width="280">
				<template #default="scope">
					<el-button type="primary" icon="User" size="small" @click="setPression(scope.row)">分配权限</el-button>
					<el-button type="primary" icon="Edit" size="small" @click="updateRole(scope.row)">编辑</el-button>
					<el-popconfirm :title="`你确定要删除${scope.row.username}吗`" width="200" @confirm="deletUser(scope.row)">
						<template #reference>
							<el-button type="primary" icon="Delete" size="small">删除</el-button>
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
			@current-change="getHasRole"
		/>
	</el-card>
	<el-dialog v-model="dialogVisible" :title="roleParams.id ? '修改角色' : '添加角色'">
		<el-form :rules="rules" :model="roleParams" ref="roleForm">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="roleParams.roleName"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="save"> 确定 </el-button>
			</div>
		</template>
	</el-dialog>

	<el-drawer v-model="drawer" direction="rtl">
		<template #header>
			<h4>分配权限</h4>
		</template>
		<template #default>
			<el-tree
				ref="tree"
				style="max-width: 600px"
				:data="menuArr"
				show-checkbox
				node-key="id"
				default-expand-all
				:default-expanded-keys="[2, 3]"
				:default-checked-keys="slectArr"
				:props="defaultProps"
			/>
		</template>
		<template #footer>
			<div style="flex: auto">
				<el-button @click="drawer = false">取消</el-button>
				<el-button type="primary" @click="confirmPermission">确定</el-button>
			</div>
		</template>
	</el-drawer>
</template>
<script setup lang="ts">
	import { reqAllRole, reqAddOrUpdateRole, reqAllPermission, reqSetPermission } from '@/api/acl/role'
	import type { RoleData, MenuDataList } from '@/api/acl/role/type'
	import { ElMessage } from 'element-plus'
	import { nextTick, onMounted, reactive, ref } from 'vue'
	let refPageNo = ref(1)
	let refPageSize = ref(10)
	let refTotal = ref(40)
	let roleArr = ref<RoleData[]>([])
	let keyword = ref('')
	let roleForm = ref()
	let dialogVisible = ref(false)
	let drawer = ref(false)
	let menuArr = ref<MenuDataList>([])
	let tree = ref()
	const defaultProps = {
		children: 'children',
		label: 'name',
	}
	let slectArr = ref<number[]>([])
	const roleParams = reactive<RoleData>({
		id: 0,
		roleName: '',
	})
	const rules = reactive({
		roleName: [
			{ required: true, message: '角色名称不为空', trigger: 'blur' },
			{ min: 2, max: 10, message: '用户姓名至少5位，且不超过10位', trigger: 'blur' },
		],
	})
	const getHasRole = async (pager = 1) => {
		refPageNo.value = pager
		const res = await reqAllRole(refPageNo.value, refPageSize.value, keyword.value)
		if (res) {
			refTotal.value = res.data.total
			roleArr.value = res.data.records
		}
	}
	const handleSize = () => {
		getHasRole()
	}
	const search = () => {
		getHasRole()
	}
	const reset = () => {
		keyword.value = ''
		getHasRole(1)
	}
	const addRole = () => {
		dialogVisible.value = true
		Object.assign(roleParams, {
			id: 0,
			roleName: '',
		})
		nextTick(() => {
			roleForm.value.clearValidate('roleName')
		})
	}
	const updateRole = (row: RoleData) => {
		Object.assign(roleParams, row)
		dialogVisible.value = true
		nextTick(() => {
			roleForm.value.clearValidate('roleName')
		})
	}
	const save = async () => {
		roleForm.value.validate(async (valid: boolean) => {
			if (valid) {
				const res = await reqAddOrUpdateRole(roleParams)
				if (res) {
					ElMessage.success(roleParams.id ? '更新成功' : '添加成功')
					getHasRole(roleParams.id ? refPageNo.value : 1)
					dialogVisible.value = false
				}
			}
		})
	}
	const setPression = async (row: RoleData) => {
		Object.assign(roleParams, row)
		const res = await reqAllPermission(row.id as number)
		if (res) {
			menuArr.value = res.data
			drawer.value = true
		}
		slectArr.value = filterSelectArr(menuArr.value, [])
	}
	const filterSelectArr = (allData: any, initArr: any) => {
		allData.forEach((item: any) => {
			if (item.select && item.level == 4) {
				initArr.push(item.id)
			}
			if (item.children && item.children.length > 0) {
				filterSelectArr(item.children, initArr)
			}
		})
		return initArr
	}
	const confirmPermission = async () => {
		let arr = tree.value.getCheckedKeys()
		let arr1 = tree.value.getHalfCheckedKeys()
		let permissionId = arr1.concat(arr)
		const res = await reqSetPermission(roleParams.id as number, permissionId)
		if (res) {
			ElMessage.success('分配成功')
			getHasRole(refPageNo.value)
			drawer.value = false
		}
	}
	onMounted(() => {
		getHasRole()
	})
</script>
<style scoped lang="scss">
	.form {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
