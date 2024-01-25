// 引入mock
import Mock from 'mockjs'
import homeApi from './mockServiceData/home'
import user from './mockServiceData/user.js'
import permission from './mockServiceData/permission'
// 定义请求拦截
Mock.mock('/api/home/getData', homeApi.getStatistication)

// 用户列表的数据
Mock.mock('/api/user/add', user.createUser)
Mock.mock('/api/user/edit', user.updateUser)
Mock.mock('/api/user/del', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)
// 登录拦截
Mock.mock(/api\/permission\/getMenu/, 'post',  permission.getMenu)