<template>
  <div>
    <!-- 主题区域插入一张卡片 -->
    <el-card>
      <!-- search-box -->
      <div class="search_box">
        <el-input
          placeholder="请输入要搜索的内容"
          class="search_con"
          clearable
        ></el-input>
        <el-button icon="el-icon-search" class="search_btn"></el-button>
      </div>

      <!-- 订单列表区域 -->
      <el-table :data="ordersList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#" width="40"></el-table-column>

        <!-- 属性 -->
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="240"
        ></el-table-column>

        <el-table-column
          prop="order_price"
          label="订单价格"
          width="100"
        ></el-table-column>

        <el-table-column prop="pay_status" label="是否付款" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="is_send"
          label="是否发货"
          width="100"
        ></el-table-column>

        <el-table-column prop="create_time" label="下单时间" width="240">
          <template slot-scope="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editDialogVisible=true"
            ></el-button>

            <!-- 详情 -->
            <el-button
              type="success"
              size="mini"
              icon="el-icon-view"
              @click="goDetail(scope.row.order_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑弹窗 -->
    <order-edit
      :orderVisible="editDialogVisible"
      @close="handleOrderEditClosed"
    ></order-edit>

    <!-- 物流弹窗 -->
    <detail-view
      ref="view"
      :detailVisible="detailDialogVisible"
      @close="handledetailViewClosed"
    ></detail-view>
  </div>
</template>

<script>
import { ordersData } from "@/api/order";
import OrderEdit from './components/orderEdit'
import detailView from './components/detailView'

export default {
  // 组件注册
  components:{
    OrderEdit,
    detailView
  },

  data() {
    return {
      // 分页请求参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,

      // 订单列表数据
      ordersList: [],

      // 控制修改对话框的显示与隐藏
      editDialogVisible:false,

      // 控制查看物流对话框的显示与隐藏
      detailDialogVisible:false
    };
  },

  created() {
    this.getOrdersList();
  },

  methods: {
    // 获取订单列表
    getOrdersList() {
      ordersData(this.queryInfo)
        .then(res => {
          console.log(res);
          this.ordersList = res.data.goods;
          this.total = res.data.total;
          console.log(this.total);
        })
        .catch(() => console.log("error"));
    },

    // 监听pageSize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrdersList();
    },

    // 监听页码值改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrdersList();
    },

    // 处理编辑对话框的关闭事件
    handleOrderEditClosed(){
      this.editDialogVisible = false
    },

    // 展示详情弹窗
    goDetail(id){
      console.log(id);
      this.$refs.view.goDetail(id)
      this.detailDialogVisible = true
    },

    // 控制详情弹窗的关闭事件
    handledetailViewClosed(){
      this.detailDialogVisible = false
    }
  }
};
</script>

<style lang="less" scoped>
.search_box {
  .search_con {
    width: 30%;
    border-radius: 1px solid #ccc;
  }

  .search_btn {
    margin-left: -2px;
    background: #f2f7f8;
  }
}

.el-table {
  margin-top: 20px;
}

.el-pagination{
  margin-top: 20px;
}
</style>
