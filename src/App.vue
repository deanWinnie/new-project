<template>
	<div class="box">
		<h1>i am dean</h1>
		<el-button>wode</el-button>
		<el-pagination layout="prev, pager, next" :total="50" />
		<SvgIcon name="stop" color="pink" width="100px" height="100px"></SvgIcon>
	</div>
</template>
<script setup lang="ts">
	import { onMounted } from 'vue';
	import { reqLogin } from '@/api/user/index'

	onMounted(() => {
		reqLogin({username:'admin',password:'123456'}).then(res=>{
			console.log(res)
		})
	})
</script>
<style scoped lang="scss">
	.box {
		// background-color: antiquewhite;
		color: aquamarine;
		h1 {
			font-weight: 800;
			font-size: 50px;
			color: $color;
		}
	}
</style>
