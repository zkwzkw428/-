import cookie from "cookiejs";
export default {
    state:{
        isCollapse:false,// 控制菜单是否展开
        // 面包屑数据
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
         // menu数据
         menu: [], 
    },
    mutations:{
        // 修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 修改面包屑数据
        selectMenu(state, val){
            if(val.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name);                   
                // 如果不存在
                if(index  === -1) {
                    state.tabList.push(val)
                }
            }
        },
        // 删除指定tag的方法
        closeTag(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置menu数据
        setMenu(state, val) {
            state.menu = val
            // 存入cookie当中
            cookie.set('menu', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router) {
            if (!cookie.get('menu')) return
            const menu = JSON.parse(cookie.get('menu'))
            state.menu = menu
            // 组装动态路由数据
            const menuArray = []
            menu.forEach(item => {
               if (item.children) {
                item.children = item.children.map(item => {
                    item.component = () => import(`../views/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
               } else {
                item.component = () => import(`../views/${item.url}`)
                menuArray.push(item)
                return item
               }
            })
            // console.log(menuArray, 'menuArray');
            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
            // console.log(router);
        }
    }

}