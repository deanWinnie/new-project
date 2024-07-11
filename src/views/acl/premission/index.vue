<template>
	<el-table :data="permissionAttr" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
		<el-table-column prop="name" label="名称" />
		<el-table-column prop="code" label="权限值" />
		<el-table-column prop="updateTime" label="修改时间" />
		<el-table-column label="操作">
			<template #default="scope">
				<el-button
					type="primary"
					icon="User"
					size="small"
					:disabled="scope.row.level === 4"
					@click="setPression(scope.row)"
					>{{ scope.row.level === 3 ? '添加功能' : '添加菜单' }}</el-button
				>
				<el-button
					type="primary"
					icon="Edit"
					size="small"
					:disabled="scope.row.level === 1"
					@click="updatePression(scope.row)"
					>编辑</el-button
				>
				<el-popconfirm :title="`你确定要删除${scope.row.name}吗`" width="200" @confirm="deletPression(scope.row)">
					<template #reference>
						<el-button type="primary" icon="Delete" size="small" :disabled="scope.row.level === 1">删除</el-button>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog v-model="dialogVisible" :title="permissionParams.id ? '修改菜单' : '添加菜单'">
		<el-form :model="permissionParams" ref="roleForm" label-width="100">
			<el-form-item label="名称" prop="name">
				<el-input v-model="permissionParams.name"></el-input>
			</el-form-item>
			<el-form-item label="权限值" prop="code">
				<el-input v-model="permissionParams.code"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="save"> 确定 </el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { Permission, PermissionList } from '@/api/acl/menu/type'
	import { reqAllPermission, reqAddOrUpdatePermission, reqDeletePermission } from '@/api/acl/menu'
	import { ElMessage } from 'element-plus'
	let permissionAttr = ref<PermissionList>([])
	let dialogVisible = ref(false)
	const permissionParams = reactive({
		id: 0,
		code: '',
		level: 0,
		name: '',
		pid: 0,
	})
	const getHasPermission = async () => {
		const res = await reqAllPermission()
		if (res) {
			permissionAttr.value = res.data
		}
	}
	const setPression = (row: Permission) => {
		Object.assign(permissionParams, {
			id: 0,
			code: '',
			name: '',
		})
		permissionParams.level = row.level + 1
		permissionParams.pid = row.id as number
		dialogVisible.value = true
	}
	const updatePression = (row: Permission) => {
		console.log(row)
		Object.assign(permissionParams, row)
		dialogVisible.value = true
	}
	const save = async () => {
		const res = await reqAddOrUpdatePermission(permissionParams)
		if (res) {
			ElMessage.success(permissionParams.id ? '更新成功' : '添加成功')
			getHasPermission()
			dialogVisible.value = false
		}
	}
	const deletPression = async (row: Permission) => {
		const res = await reqDeletePermission(row.id as number)
		if (res) {
			ElMessage.success('删除成功')
			getHasPermission()
		}
	}
	onMounted(() => {
		getHasPermission()
	})
</script>
<style scoped lang="scss"></style>
