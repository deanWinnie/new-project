<template>
	<div class="logo" v-if="setting.loginHidden">
		<img :src="setting.logo" alt="" srcset="" />
		<p>{{ setting.title }}</p>
	</div>
</template>
<script setup lang="ts">
	import setting from '@/setting'
</script>
<script lang="ts">
	export default {
		name: 'Logo',
	}
</script>
<style scoped lang="scss">
	.logo {
		width: 100%;
		height: $base-menu-logo-height;
		color: white;
		display: flex;
		align-items: center;
		padding: 20px;
		img {
			width: 25px;
			height: 25px;
		}
		p {
			font-size: $base-logo-title-fontSize;
			margin-left: 10px;
			white-space: nowrap;
		}
	}
</style>
