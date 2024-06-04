import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/style/index.scss'
import router from './router'
const app = createApp(App)
app.use(ElementPlus, {
	locale: zhCn,
})
//全局组件
import gloalComponent from '@/components'
app.use(gloalComponent)
app.use(router)
app.mount('#app')
console.log(import.meta.env)
