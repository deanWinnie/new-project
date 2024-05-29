//全局注册文件
import Pagination from '@/components/Pagination/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
//全局对象
const allGlobalComponent:any = { SvgIcon, Pagination}

//对外暴露插件对象
export default {
  install(app:any){
    Object.keys(allGlobalComponent).forEach(key=>{
      app.component(key,allGlobalComponent[key])
    })
  }
}
