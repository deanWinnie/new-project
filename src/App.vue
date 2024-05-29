<template>
	<div class="box">
		<h1>i am dean</h1>
	</div>
</template>
<script setup lang="ts">
	const fun = () => {
		console.log('your are funking man')
	}

	fun()
</script>
<style scoped lang="scss">
	.box {
		background-color: antiquewhite;
		color: aquamarine;
		h1 {
			font-weight: 800;
			font-size: 50px;
		}
	}
</style>
