<template>
  <div>
    <!-- 主题区域引入一张卡片 -->
    <el-card>
      <!-- 添加分类按钮 -->
      <el-button
        type="primary"
        @click="addCate"
      >
        添加分类
      </el-button>

      <!-- 商品分类列表 -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
      >
        <!-- 是否有效列 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color:lightgreen"
          ></i>
          <i 
            class="el-icon-error" 
            v-else
            style="color:red"
          ></i>
        </template>
        
        <!-- 排序列 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>

        <!-- 操作列 -->
        <template slot="opt" slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCateById(scope.row)"
          >
             编辑
          </el-button>

           <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeCateById(scope.row.cat_id)"
          >
             编辑
          </el-button>
        </template>

      </tree-table>

      <!-- 分页区域 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1,3,5,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 添加分类对话框 -->
      <sort-add
        :cateVisible="addDiaglogVisible"
        :cateParentData="parentCateList"
        @close="handleCateAddClosed"
        @success="handleCateAddSuccess"
      ></sort-add>

      <!-- 修改分类弹窗 -->
      <sort-edit
        ref="sort"
        :editVisible="editDialogVisible"
        @close="handleCateEditClosed"
        @success="handleCateEditSuccess"
      ></sort-edit>

    </el-card>
  </div>
</template>

<script>
import { goodsCate,cateDelete } from '@/api/goods'
import SortAdd from './components/sortAdd'
import SortEdit from './components/sortEdit'

export default {
  // 注册组件
  components:{
    SortAdd,
    SortEdit
  },

  data(){
    return{
      // 分页参数
      queryInfo:{
        type:3,
        pagenum: 1,
        pagesize: 5
      },
      // 总数
      total:0,
      // 商品分类数据列表
      cateList:[],
      // 父级分类列表
      parentCateList:[],
      // 为table指定列的定义
      columns:[
        {
          label:"分类名称",
          prop:'cat_name'
        },
        {
          label:"是否有效",
          // 将当前列定义为模板列
          type:"template",
          // 当前列使用的模板名称
          template:'isok'
        },
        {
          label:"排序",
          type:'template',
          template:'order'
        },
        {
          label:'操作',
          type:'template',
          template:'opt'
        }
      ],
      // 控制添加分类对话框的显示与隐藏
      addDiaglogVisible:false,
      // 控制编辑分类对话框的显示与隐藏
      editDialogVisible:false
    }
  },

  created(){
    // 获取商品分类列表数据
    this.getCateList()
  },

  methods:{
    // 获取商品分类列表
    getCateList(){
      goodsCate(this.queryInfo).then(res => {
        console.log(res);
        this.cateList = res.data.result
        this.total=res.data.total
      }).catch(() => console.log('error'))
    },

   // 监听pageSize改变事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },

    // 监听页码值改变事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },

    // 添加分类操作
    addCate(){
      // 获取父级分类的数据列表
      this.getParentCateList()
      this.addDiaglogVisible = true
    },

    // 获取父级分类的数据列表
    getParentCateList(){
      goodsCate({type:2,pagenum:1,pagesize:5}).then(res => {
        console.log(res);
        this.parentCateList = res.data.result
      })
    },

    // 关闭添加分类对话框
    handleCateAddClosed(){
      this.addDiaglogVisible = false
    },

    // 添加分类成功的处理
    handleCateAddSuccess(){
      this.getCateList()
      this.addDiaglogVisible = false
    },

    // 展示修改弹窗
    editCateById(record){
      console.log(record);
      this.$refs.sort.editCateById(record)
      this.editDialogVisible = true
    },

    // 关闭修改对话框
    handleCateEditClosed(){
      this.editDialogVisible = false
    },

    // 修改分类成功的处理
    handleCateEditSuccess(){
      this.getCateList()
      this.editDialogVisible = false
    },

    // 根据id删除对应的商品分类
    removeCateById(id){
      console.log(id);
      const confirmResult = this.$confirm(
        '此操作将永久删除该分类，是否继续？',
        '提示',
        {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          cateDelete(id).then(res => {
            console.log(res);
            this.getCateList()
          }).catch(()=>console.log('error'))
        }).catch(() => {
         this.$message.error('删除分类失败！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .treeTable{
    margin-top: 30px;
  }
</style>