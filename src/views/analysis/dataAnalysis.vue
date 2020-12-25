<template>
  <div class="myChart" :style="{ width: '100%', height: '350px' }"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 折线
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// tooltip组件、title组件和legend组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

import { chartData } from "@/api/chart";
import _ from 'lodash'


export default {
  data() {
    return {
      // 折线数据
      lineData:{},

       options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    
    };
  },

  mounted() {
    this.initCharts()
  },

  methods: {
    // 获取折线图数据
    // getChartData() {
    //   chartData()
    //     .then(res => {
    //       console.log(1);
    //       console.log(res); 
    //       this.lineData = _.cloneDeep(res.data) 
    //       console.log(this.lineData);
    //       result = _.clone(_.merge(res.data,this.options)) 
    //       console.log(result);

    //     })
    //     .catch((req) => console.log(req));
    // },

    // 初始化echarts表
    initCharts() {
      console.log(1);
      this.chart = echarts.init(this.$el);
      console.log(this.chart);

      chartData()
        .then(res => {
          console.log(2);
          console.log(res); 
          this.lineData = res.data
          console.log(3);
         this.setOptions();
         console.log(4);
        })
        .catch((req) => console.log(req));
    },

    // 为表格设置参数
    setOptions() {
      console.log(5);
      // this.chart.setOption({
      //   title: {
      //     text: "ECharts 入门例子"
      //   },
      //   // 鼠标放到折线图上展示的数据样式
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true
      //   },
      //   // legend:{
      //   //   data:['京东','淘宝','拼多多']
      //   // },
      //   legend: this.chartData.legend,
      //   xAxis: {
      //     type: "category",
      //     // data:['上衣','外套','裙子','裤子','袜子','鞋'],
      //     data: this.target(this.chartData.xAxis,0),
      //     // x轴名称样式
      //     nameTextStyle: {
      //       fontWeight: 600,
      //       fontSize: 18
      //     }
      //   },
      //   yAxis: {
      //     type: "value",
      //     nameTextStyle: {
      //       fontWeight: 600,
      //       fontSize: 18
      //     }
      //   },

      //   // series:[
      //   //   {
      //   //     name:'京东',
      //   //     data:[5,10,15,20,25,30],
      //   //     type:'line'
      //   //   },
      //   //   {
      //   //     name:'淘宝',
      //   //     data:[60,50,40,30,20,10],
      //   //     type:'line'
      //   //   },
      //   //   {
      //   //     name:'拼多多',
      //   //     data:[22,44,66,55,33,11],
      //   //     type:'line'
      //   //   }
      //   // ]
      //   series: this.chartData.series
      // });

     
      
      console.log(6);
      console.log(this.lineData);
      this.chart.setOption(_.merge(this.lineData,this.options))
      console.log(7);
    }
  }
};
</script>

<style lang="less" scoped>
.myChart {
  margin-top: 30px;
}
</style>
