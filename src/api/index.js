import http from '../util/request.js'
// 请求首页数据
export const getData = () =>{
    // 返回promise对象
    return http.get('/home/getData')
}

// 请求用户数据
export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/getUser', params)
}

export const addUser = (data) => {
    // 添加用户
    return http.post('/user/add', data)
}

export const editUser = (data) => {
    // 编辑用户
    return http.post('/user/edit', data)
}

export const delUser = (data) => {
    return http.post('/user/del', data)
}

export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}