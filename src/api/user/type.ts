//登陆接口需要携带参数TS类型
export interface LoginForm {
  username:string,
  password:string
}
interface DataType {
  token:string
}
//登陆接口返回数据类型
export interface LoginResponseData {
  code:number,
  data:DataType
}
interface UserInfo {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string,
}
interface User {
  checkUser:UserInfo
}
//获取用户信息接口返回数据类型
export interface UserResponseData {
  code:number,
  data:User
}