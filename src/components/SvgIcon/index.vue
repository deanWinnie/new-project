<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix+name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  //xlink:href属性值的前缀
  prefix:{
    type:String,
    default:'#icon-'
  },
  //名称
  name:String,
  //颜色
  color:{
    type:String,
    default:''
  },
  //宽度
  width:{
    type:String,
    default:'16px'
  },
  //高度
  height:{
    type:String,
    default:'16px'
  }
})
</script>
<style scope></style>