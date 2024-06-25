<template>
	<el-card>
		<el-button type="primary" icon="Plus" @click="handleAdd">添加品牌</el-button>
		<el-table style="margin: 10px 0" border :data="refTrademarkList">
			<el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
			<el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
			<el-table-column label="品牌LOGO">
				<template #default="scope">
					<img :src="scope.row.logoUrl" alt="" style="height: 100px" />
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" size="small" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
					<el-popconfirm
						confirm-button-text="确定"
						cancel-button-text="取消"
						icon="Delete"
						icon-color="red"
						:title="`您确定要删除${scope.row.tmName}?`"
						@confirm="confirmEvent(scope.row.id)"
						width="250"
					>
						<template #reference>
							<el-button type="primary" size="small" icon="Delete"></el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="refPageNo"
			v-model:page-size="refLimit"
			:page-sizes="[3, 5, 7, 9]"
			:background="true"
			layout="prev, pager, next, jumper,->,sizes,total"
			:total="refTotal"
			@size-change="handleSize"
			@current-change="getHasTradeMark"
		/>
	</el-card>
	<el-dialog v-model="refDialogFormVisible" :title="refDialogTitle">
		<el-form :model="trademarkParams" style="width: 80%" :rules="rules" ref="refFrom">
			<el-form-item label="品牌名称" label-width="100" prop="tmName">
				<el-input v-model="trademarkParams.tmName" autocomplete="off" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="品牌LOGO" label-width="100" prop="logoUrl">
				<el-upload
					class="avatar-uploader"
					action="/api/admin/product/fileUpload"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
				</el-upload>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="refDialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="handleConfirm"> 确定 </el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
	import { nextTick, onMounted, reactive, ref } from 'vue'
	import { reqHasTradeMark, reqAddOrUpdateTrademark, reqDeleteTradeMark } from '@/api/product/trademark'
	import type { Records, TradeMark } from '@/api/product/trademark/type'
	import type { UploadProps } from 'element-plus'
	import { ElMessage } from 'element-plus'

	let refPageNo = ref(1)
	let refLimit = ref(3)
	let refTotal = ref(0)
	let refTrademarkList = ref<Records>([])
	let refDialogFormVisible = ref(false)
	let refDialogTitle = ref('添加品牌')
	let trademarkParams = reactive<TradeMark>({
		tmName: '',
		logoUrl: '',
		id: 0,
	})
	let refFrom = ref()
	const validatorTmName = (_rule: any, value: any, callBack: any) => {
		if (value.trim().length >= 2) {
			callBack()
		} else {
			callBack(new Error('品牌名称位数大于等于两位'))
		}
	}
	const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
		if (value) {
			callBack()
		} else {
			callBack(new Error('LOGO图片必须上传'))
		}
	}
	const rules = {
		tmName: [{ required: true, trigger: 'blur', message: '品牌不能为空', validator: validatorTmName }],
		logoUrl: [{ required: true, trigger: 'blur', message: '品牌LOGO不能为空', validator: validatorLogoUrl }],
	}

	const getHasTradeMark = async (pager = 1) => {
		refPageNo.value = pager
		const res = await reqHasTradeMark(refPageNo.value, refLimit.value)
		refTotal.value = res.data.total
		refTrademarkList.value = res.data.records
	}
	const handleSize = () => {
		getHasTradeMark()
	}
	const handleAdd = () => {
		refDialogTitle.value = '添加品牌'

		trademarkParams.id = 0
		trademarkParams.logoUrl = ''
		trademarkParams.tmName = ''
		refDialogFormVisible.value = true
		//方法一：为什么要写refFrom.value?这样的形式是因为第一次打开value的时候，还没渲染出来clearValidate方法会报错
		//refFrom.value?.clearValidate()
		//方法二
		nextTick(() => {
			refFrom.value.clearValidate()
		})
	}
	const handleUpdate = (row: TradeMark) => {
		refDialogTitle.value = '修改品牌'
		//常规赋值
		// trademarkParams.logoUrl = row.logoUrl
		// trademarkParams.tmName = row.tmName
		// trademarkParams.id = row.id
		//ES6合并对象语法
		Object.assign(trademarkParams, row)
		refDialogFormVisible.value = true
		nextTick(() => {
			refFrom.value.clearValidate()
		})
	}
	const handleConfirm = async () => {
		await refFrom.value.validate()
		const res = await reqAddOrUpdateTrademark(trademarkParams)
		if (res) {
			ElMessage.success(trademarkParams.id ? '修改成功' : '添加成功')
			refDialogFormVisible.value = false
			getHasTradeMark(trademarkParams.id ? refPageNo.value : 1)
		}
	}
	const handleAvatarSuccess: UploadProps['onSuccess'] = (res) => {
		trademarkParams.logoUrl = res.data
		refFrom.value.clearValidate('logoUrl')
	}

	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
		if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
			ElMessage.error('上传文件的格式必须是PNG|JPG|GIF')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('图片不能超过2MB')
			return false
		}
		return true
	}
	const confirmEvent = async (id: number) => {
		const res = await reqDeleteTradeMark(id)
		if (res) {
			ElMessage.success('删除品牌成功')
			//当前页只有一条数据的时候回到上一页
			getHasTradeMark(refTrademarkList.value.length > 1 ? refPageNo.value : refPageNo.value - 1)
		}
	}
	onMounted(() => {
		getHasTradeMark()
	})
</script>
<style scoped>
	.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		text-align: center;
	}
</style>
