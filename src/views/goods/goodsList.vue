<template>
  <div>
    <!-- 主题区域引入一张卡片 -->
    <el-card>
      <!-- 输入框 -->
      <div class="input_box">
        <el-input 
          placeholder="请输入搜索内容" 
          class="input_con"
          v-model="queryInfo.query"
          clearable
          @clear="getGoodsList"
        ></el-input>
        <el-button 
          icon="el-icon-search" 
          class="input_btn"
          @click="getGoodsList"
        ></el-button>
        <!-- 添加按钮 -->
        <el-button 
          type="primary" 
          class="user_add"
          @click="toGoodsAdd"
        >
          添加商品
        </el-button>
      </div>

      <!-- 商品列表 -->
      <el-table border stripe :data="goodsList">
        <!-- 索引列 -->
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <!-- 商品名称 -->
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <!-- 商品价格 -->
        <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
        <!-- 商品重量 -->
        <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
        <!-- 商品数量 -->
        <el-table-column label="商品数量" prop="goods_number" width="80px"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" prop="add_time" width="160px">
          <template slot-scope="scope">
            {{scope.row.add_time | dataFormat}}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button 
              type="primary" 
              size="mini" 
              icon="el-icon-edit" 
              @click="editGoodsById(scope.row)"
            ></el-button>
            <!-- 删除 -->
            <el-button 
              type="danger" 
              size="mini" 
              icon="el-icon-delete"
              @click="removeGoodsById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1,3,5,10]"
        :page-size="queryInfo.pagesize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { goodsData,goodsDelete } from '@/api/goods'

export default {
  data(){
    return{
      // 分页参数
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      // 商品列表数据
      goodsList:[],
      // 商品总数
      total:0
    }
  },

  created(){
    // 获取商品列表数据
    this.getGoodsList()
  },

  methods:{
    // 获取商品列表数据
    getGoodsList(){
      goodsData(this.queryInfo).then(res => {
        console.log(res);
        this.goodsList = res.data.goods
        this.total = res.data.total
      })
    },

    // 监听pagesize改变事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },

    // 监听页码值改变事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },

    // 根据商品id删除商品
    removeGoodsById(id){
      console.log(id);
      goodsDelete(id).then(res => {
        console.log(res);
        this.getGoodsList()
      }).catch(() => console.log('error'))
    },

    // 设置路由跳转到添加商品页
    toGoodsAdd(){
      this.$router.push('./components/itemAdd')
    },

    // 编辑商品
    editGoodsById(record){
      console.log(record);
      this.$router.push({path:'./components/itemAdd',query:{record:record}})
    }
  }
}
</script>

<style lang="less" scoped>
  .input_box {
    .input_con {
      width: 25%;
      border-radius: 1px solid #ccc;
    }

    .input_btn {
      margin-left: -2px;
      background: #f2f7f8;
    }

    .user_add {
      margin-left: 30px;
    }
  }
</style>