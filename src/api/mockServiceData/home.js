// mock数据模拟
import Mock from "mockjs"
// 图表数据
let list = []
export default {
    getStatistication:()=>{
        // Mock.Random.float产生随机数100-8000之间，保留小数，最小0位，最大0位
        for(let i = 0; i < 7; i++){
            list.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0)
                })
            )
        }
        return {
            code:20000,
            data:{
                // 饼图
                videoData:[
                    {
                        name:'苹果',
                        value:5999
                    },
                    {
                        name:'vivo',
                        value:1999
                    },
                    {
                        name:'oppo',
                        value:2188
                    },
                    {
                        name:'小米',
                        value:3999
                    },
                    {
                        name:'三星',
                        value:9999
                    },
                    {
                        name:'华为',
                        value:4199
                    }
                ],
                // 折线图
                orderData:{
                    data:[
                        {'苹果':2471,'vivo':4121,'oppo':3961,'华为':1289,'三星':4859,'小米':1999},
                        {'苹果':5972,'vivo':3216,'oppo':1261,'华为':2729,'三星':4559,'小米':2999},
                        {'苹果':2463,'vivo':2681,'oppo':3961,'华为':6456,'三星':2694,'小米':3999},
                        {'苹果':1466,'vivo':1032,'oppo':1961,'华为':1269,'三星':6819,'小米':2299},
                        {'苹果':2444,'vivo':3634,'oppo':3661,'华为':7244,'三星':4649,'小米':2599},
                        {'苹果':3456,'vivo':3924,'oppo':3961,'华为':1639,'三星':6009,'小米':2499},
                        {'苹果':5417,'vivo':3335,'oppo':3131,'华为':5294,'三星':4559,'小米':4199}
                    ],
                },
                // 表格
                tableData:[
                    {
                      name:'oppo',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    },
                    {
                      name:'vivo',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    },
                    {
                      name:'xiaomi',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    },
                    {
                      name:'huawei',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    },
                    {
                      name:'iphone',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    },
                    {
                      name:'sanxing',
                      todayBuy:100,
                      monthBuy:300,
                      totalBuy:800
                    }
                  ],
                //   柱状图
                userData:[
                    {
                        date:'周一',
                        new:5,
                        active:200,
                    },
                    {
                        date:'周二',
                        new:10,
                        active:500,
                    },
                    {
                        date:'周三',
                        new:12,
                        active:550,
                    },
                    {
                        date:'周四',
                        new:60,
                        active:800,
                    },{
                        date:'周五',
                        new:65,
                        active:550,
                    },{
                        date:'周六',
                        new:53,
                        active:770,
                    },{
                        date:'周日',
                        new:33,
                        active:170,
                    }
                ]
            },
        }
    }
};