//进行axios的二次封装:使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//第一步：利用axios的creat()方法，去创建axios实例
let request = axios.create({
	//基础路径
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 5000, //设置超时时间
})
//第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
	//config配置对象，hearders属性请求头，经常给服务器携带公共参数
	return config
})
//第三步 响应拦截器
request.interceptors.response.use(
	(res) => {
		//成功回调
		if (res.data.code === 200) {
			return res.data
		} else {
			ElMessage({
				type: 'error',
				message: res.data.data.message,
			})
		}
	},
	(error) => {
		let message = ''
		let status = error.response.status
		switch (status) {
			case 401:
				message = 'TOKEN过期'
				break
			case 403:
				message = '无权访问'
				break
			case 404:
				message = '请求地址错误'
				break
			case 500:
				message = '服务器错误'
				break
			default:
				message = '网络错误'
				break
		}
		ElMessage({
			type: 'error',
			message,
		})
		return Promise.reject(error)
	},
)

//对外暴露
export default request
