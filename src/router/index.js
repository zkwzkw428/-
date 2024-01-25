import Vue from 'vue'
// 引入Router
import VueRouter from 'vue-router'
// 引入组件
// import PageHome from '../views/PageHome.vue'
// import PageUsers from '../views/PageUsers.vue'
import PageMain from '../views/PageMain.vue'
// import mallManage from '../views/mallManage.vue'
// import pageOne from '../views/pageOne.vue'
// import pageTwo from '../views/pageTwo.vue'
import userLogin from '../views/userLogin.vue'
import cookie from 'cookiejs'
Vue.use(VueRouter)
// 定制路由映射关系
const routes = [
    {
        path:'/',
        component:PageMain,
        name: 'Main',
        // 重定向
        redirect:'/home',
        // children:[
        //     // 首页
        //     {
        //         path:'home',
        //         name:'home',
        //         component:PageHome
        //     },
        //     // 商品
        //     {
        //         path:'mall',
        //         name: 'mall',
        //         component:mallManage
        //     },
        //     // 用户
        //     {
        //         path:'user',
        //         name: 'user',
        //         component:PageUsers
        //     },
        //     // 其他页1
        //     {
        //         path:'page1',
        //         name: 'page',
        //         component:pageOne
        //     },
        //     // 其他页2
        //     {
        //         path:'page2',
        //         name: 'page2',
        //         component:pageTwo
        //     }
        // ]
    },
    {
        name: 'login',
        path: '/login',
        component: userLogin,
    }
]
// 配置路由器
const router = new VueRouter({
    routes
})
// 配置全局路由守卫
router.beforeEach((to, from, next) => {
    const token = cookie.get('token')
    // token不存在，说明当前用户未登录，应该跳转到登录页
    if (!token && to.name !== 'login') { 
        next({ name: 'login' })
    } else if (token && to.name === 'login') { // token存在，说明用户登录，此时跳转到首页
        next({ name: 'home' })
    } else {
        next()
    }
})
export default router

