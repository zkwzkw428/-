<template>
  <el-row>
    <!-- 栅栏左侧 -->
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2023-10-27</span></p>
          <p>上次登录地点:<span>湖南常德</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 栅栏右侧 -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 订单详情 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <!-- 动态渲染样式 -->
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px;"></div>
      </el-card>
      <!-- 柱形区域 -->
      <div class="graph">
        <el-card class="el-card" style="height: 260px">
          <div ref="echarts2" style="height: 260px;"></div>
        </el-card>
        <el-card class="el-card" style="height: 260px">
          <div ref="echarts3" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api';
// 引入echarts
import * as echarts from 'echarts'
export default {
  name: "PageHome",
  data() {
    return {
      // 表格数据
      tableData:[],
      // 表头项
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      // 订单数据
      countData:[
        {
          name:'今日支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日收藏订单',
          value:210,
          icon:'star-on',
          color:'#2ec7c9'
        },
        {
          name:'今日未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#5ab1ef'
        },
        {
          name:'本月支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'本月收藏订单',
          value:210,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'本月未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#2ec7c9'
        },
      ]

    };
  },
  mounted(){
    // 调用请求函数
    getData().then(({data})=>{
      const {tableData} = data.data
      // 将获取的数据传递给组件
      this.tableData =  tableData
       // 基于准备好的dom，初始化图形数据
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项项目和数据
      let echarts1Option = {}
      // 处理数据xAxis
      const {orderData, userData, videoData} = data.data
      // 遍历数组第一项的key
      const xAxis = Object.keys(orderData.data[0])
      console.log(orderData);
      const xAxisData = {
        data:xAxis
      }
      // 配置对象添加x轴数据
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis =  {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      echarts1.setOption(echarts1Option)
      // 柱状图渲染
      const echarst2 = echarts.init(this.$refs.echarts2)
      // 配置数据
      const echarst2Option = {
        legend:{
          textStyle: {
            color: '#333'
          },
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis:{
          type:'category',
          data:userData.map(item => item.date),
          axisLine:{
            lineStyle:{
              color:'#17b3a3',
            }
          },
          axisLabel:{
            interval: 0,
            color:'#333',
          },
        },
        yAxis: [
          {
            type:'value',
            axisLine: {
              lineStyle: {
                color:'#17b3a3',
              },
            },
          },
        ],
        color:['#2ec7c79', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar',
          }
        ]
      }
      echarst2.setOption(echarst2Option)
      
      // 饼图渲染
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item',
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    },()=>{
      console.log('接口数据获取失败');
    })
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  // 一行显示卡片
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
