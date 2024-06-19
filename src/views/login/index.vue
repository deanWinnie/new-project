<template>
	<div class="login_container">
		<el-row>
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form class="login_form" :model="loginForm" :rules="rules" ref="refLoginForm">
					<h1>Hello</h1>
					<h2>欢迎来到ts+vue3项目</h2>
					<el-form-item prop="username">
						<el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="login_btn" type="primary" @click="login" :loading="refLoading">登录</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script setup lang="ts">
	import { User, Lock } from '@element-plus/icons-vue'
	import { reactive, ref } from 'vue'
	import useUserStore from '@/store/module/user'
	import { useRouter, useRoute } from 'vue-router'
	import { ElNotification } from 'element-plus'
	import { getTime } from '@/utils/time'
	const userStore = useUserStore()
	const loginForm = reactive({
		username: 'admin',
		password: '111111',
	})
	const refLoginForm = ref()
	const $router = useRouter()
	const $route = useRoute()
	let refLoading = ref(false)
	const rules = reactive({
		username: [
			{ required: true, message: '账号不为空', trigger: 'blur' },
			{ min: 5, max: 10, message: '账号至少5位，且不超过10位', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '密码不为空', trigger: 'blur' },
			{ min: 5, max: 15, message: '密码至少5位，且不超过15位', trigger: 'blur' },
		],
	})
	const login = () => {
		refLoginForm.value.validate((valid: boolean) => {
			if (valid) {
				refLoading.value = true
				userStore
					.userLogin(loginForm)
					.then((res) => {
						if (res) {
							refLoading.value = false
							ElNotification({
								type: 'success',
								title: `Hi,${getTime()}好`,
								message: '欢迎回来',
							})
							const redirect: any = $route.query.redirect
							$router.push({ path: redirect || '/' })
						}
					})
					.catch(() => {
						refLoading.value = false
					})
			} else {
				console.log('error submit!')
			}
		})
	}
</script>
<style scoped lang="scss">
	.login_container {
		width: 100%;
		height: 100vh;
		background: url('@/assets/images/background.jpg') no-repeat;
		background-size: cover;
		.login_form {
			position: relative;
			width: 80%;
			top: 30vh;
			background: url('@/assets/images/login_form.png') no-repeat;
			background-size: cover;
			padding: 40px;
			h1 {
				color: white;
				font-size: 40px;
				margin-top: 10px;
			}
			h2 {
				color: white;
				font-size: 20px;
				margin: 20px 0;
			}
			.login_btn {
				width: 100%;
			}
		}
	}
</style>
