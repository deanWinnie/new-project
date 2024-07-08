<template>
	<el-card style="height: 80px">
		<el-form :inline="true" class="form">
			<el-form-item label="用户名">
				<el-input></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">搜索</el-button>
			</el-form-item>
		</el-form>
	</el-card>
	<el-card style="margin: 10px 0">
		<el-button type="primary" @click="addUser">添加</el-button>
		<el-button type="primary">批量删除</el-button>
		<el-table style="margin: 10px 0" border :data="userArr">
			<el-table-column type="selection"></el-table-column>
			<el-table-column type="index" label="#" align="center"></el-table-column>
			<el-table-column label="id" align="center" prop="id"></el-table-column>
			<el-table-column label="用户名称" show-overflow-tooltip align="center" prop="username"></el-table-column>
			<el-table-column label="用户角色" show-overflow-tooltip align="center" prop="roleName"></el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
			<el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
			<el-table-column label="操作" width="280">
				<template #default="scope">
					<el-button type="primary" icon="User" size="small" @click="setRole(scope.row)">分配角色</el-button>
					<el-button type="primary" icon="Edit" size="small" @click="updateUser(scope.row)">编辑</el-button>
					<el-button type="primary" icon="Delete" size="small">删除</el-button>
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
			@current-change="getHasUser"
		/>
	</el-card>
	<el-drawer v-model="drawer" direction="rtl">
		<template #header>
			<h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
		</template>
		<template #default>
			<el-form :model="userParams" :rules="rules" ref="userForm" label-width="100">
				<el-form-item label="用户姓名" prop="username">
					<el-input v-model="userParams.username"></el-input>
				</el-form-item>
				<el-form-item label="用户昵称" prop="name">
					<el-input v-model="userParams.name"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" prop="password" v-if="!userParams.id">
					<el-input v-model="userParams.password"></el-input>
				</el-form-item>
			</el-form>
		</template>
		<template #footer>
			<div style="flex: auto">
				<el-button @click="drawer = false">取消</el-button>
				<el-button type="primary" @click="save">确定</el-button>
			</div>
		</template>
	</el-drawer>
	<el-drawer v-model="drawer1" direction="rtl">
		<template #header>
			<h4>分配角色</h4>
		</template>
		<template #default>
			<el-form :model="userParams">
				<el-form-item label="用户姓名">
					<el-input v-model="userParams.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="角色列表">
					<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
						全选
					</el-checkbox>
					<el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">
							{{ role }}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
		</template>
		<template #footer>
			<div style="flex: auto">
				<el-button @click="drawer1 = false">取消</el-button>
				<el-button type="primary" @click="save">确定</el-button>
			</div>
		</template>
	</el-drawer>
</template>
<script setup lang="ts">
	import { nextTick, onMounted, reactive, ref } from 'vue'
	import { reqAllUser, reqAddOrUpdateUser } from '@/api/acl/user'
	import { User } from '@/api/acl/user/type'
	import { ElMessage } from 'element-plus'

	let refPageNo = ref(1)
	let refPageSize = ref(10)
	let refTotal = ref(40)
	let userArr = ref<User[]>([])
	let drawer = ref(false)
	let drawer1 = ref(false)
	let userForm = ref()
	let checkAll = ref(false)
	let isIndeterminate = ref(true)
	const checkedRoles = ref(['销售', '运营', '运维'])
	const allRole = ref(['销售', '运营', '运维', '行政', '人事', '技术', '科研'])
	const rules = reactive({
		username: [
			{ required: true, message: '用户姓名不为空', trigger: 'blur' },
			{ min: 5, max: 10, message: '用户姓名至少5位，且不超过10位', trigger: 'blur' },
		],
		name: [
			{ required: true, message: '用户昵称不为空', trigger: 'blur' },
			{ min: 5, max: 10, message: '用户昵称至少5位，且不超过10位', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '密码不为空', trigger: 'blur' },
			{ min: 6, max: 15, message: '密码至少6位，且不超过15位', trigger: 'blur' },
		],
	})
	const userParams = reactive<User>({
		id: 0,
		username: '',
		name: '',
		password: '',
	})
	const getHasUser = async (pager = 1) => {
		refPageNo.value = pager
		const res = await reqAllUser(refPageNo.value, refPageSize.value)
		if (res) {
			refTotal.value = res.data.total
			userArr.value = res.data.records
		}
	}
	const handleSize = () => {
		getHasUser()
	}
	const addUser = () => {
		drawer.value = true
		Object.assign(userParams, {
			username: '',
			name: '',
			password: '',
		})
		//清楚上一次错误提示的信息
		nextTick(() => {
			userForm.value.clearValidate('username')
			userForm.value.clearValidate('name')
			userForm.value.clearValidate('password')
		})
	}
	const updateUser = (row: User) => {
		drawer.value = true
		Object.assign(userParams, row)
		//清楚上一次错误提示的信息
		nextTick(() => {
			userForm.value.clearValidate('username')
			userForm.value.clearValidate('name')
		})
	}
	const save = async () => {
		userForm.value.validate(async (valid: boolean) => {
			if (valid) {
				const res = await reqAddOrUpdateUser(userParams)
				if (res) {
					ElMessage.success(userParams.id ? '更新成功' : '添加成功')
					getHasUser(userParams.id ? refPageNo.value : 1)
					drawer.value = false
				}
			}
		})
	}
	const setRole = (row: User) => {
		drawer1.value = true
		Object.assign(userParams, row)
	}
	const handleCheckAllChange = (val: boolean) => {
		checkedRoles.value = val ? allRole.value : []
		isIndeterminate.value = false
	}
	const handleCheckedCitiesChange = (value: string[]) => {
		const checkedCount = value.length
		checkAll.value = checkedCount === allRole.value.length
		isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
	}
	onMounted(() => [getHasUser()])
</script>
<style scoped lang="scss">
	.form {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
