<template>
  <div>
    <el-dialog
      title="订单详情"
      :visible.sync="itemVisible"
      width="50%"
      @close="onClose"
    >
      <el-form :model="detailInfo" label-width="100px">
        <el-form-item label="订单编号" prop="order_number">
          <el-input v-model="detailInfo.order_number"></el-input>
        </el-form-item>

        <el-form-item label="订单价格" prop="order_price">
          <el-input v-model="detailInfo.order_price"></el-input>
        </el-form-item>

        <el-form-item label="是否付款">
          <template>
            <el-tag type="success" v-if="detailInfo.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-form-item>

        <el-form-item label="下单时间">
          <template>
            {{ detailInfo.create_time | dataFormat }}
          </template>
        </el-form-item>

        <div :class="[goodsList.length === 0 ? 'showNone' : 'showGoods']">
          <el-table :data="goodsList" stripe border>
          <!-- 为表格添加索引列 -->
          <el-table-column type="index" label="#" width="40"></el-table-column>

          <!-- 表格数据 -->
          <el-table-column prop="goods_id" label="商品ID"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格"></el-table-column>
          <el-table-column prop="goods_number" label="商品数量"></el-table-column>
          <el-table-column prop="goods_total_price" label="价格总数"></el-table-column>
        </el-table>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ordersDetail } from "@/api/order";

export default {
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      // 详情信息
      detailInfo: {},
      // 商品信息
      goodsList: []
    };
  },

  computed: {
    itemVisible: {
      get: function () {
        return this.detailVisible;
      },
      set: function () { }
    }
  },

  methods: {
    onClose () {
      this.$emit("close");
    },

    // 根据id查看详情
    goDetail (id) {
      console.log(id);
      // 根据id获取详细信息
      ordersDetail(id)
        .then(res => {
          console.log(res);
          this.detailInfo = res.data;
          console.log(this.detailInfo);
          this.goodsList = res.data.goods
          console.log(this.goodsList);
        })
        .catch(req => console.log(req));
    }
  }
};
</script>

<style lang="less" scoped>
  .showGoods{
    display: block;
  }

  .showNone{
    display: none;
  }
</style>
