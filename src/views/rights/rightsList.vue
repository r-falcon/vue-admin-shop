<template>
  <div>
    <el-card>
      <!-- 权限列表 -->
      <el-table border stripe :data="rightsList">
        <!-- 为表格添加索引列 -->
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <!-- 表格数据 -->
        <el-table-column
          prop="authName"
          label="权限名称"
        ></el-table-column>
        <el-table-column
          prop="path"
          label="路径"
        ></el-table-column>
        <el-table-column
          prop="level"
          label="权限等级"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rightsData } from "@/api/rights";

export default {
  data() {
    return {
      // 权限列表数据
      rightsList: []
    };
  },

  created() {
    this.getRightsList();
  },

  methods: {
    // 获取权限列表数据
    getRightsList() {
      rightsData()
        .then(res => {
          console.log(res);
          this.rightsList = res.data;
        })
        .catch(() => console.log("error"));
    }
  }
};
</script>
