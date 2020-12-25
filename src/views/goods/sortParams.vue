<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>

      <!-- 选择商品分类 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择器 -->
          <el-cascader
            expand-trigger="hover"
            :options="cateList"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- tab标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDiaglogVisible=true"
          >添加参数</el-button>

          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe class="show_table">
            <!-- 扩展列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  class="item_tag"
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 可输入的的input框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>

            <!-- 索引列 -->
            <el-table-column type="index" label="#"></el-table-column>

            <el-table-column label="参数名称" prop="attr_name"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 编辑 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editParamsById(scope.row)"
                >编辑</el-button>

                <!-- 删除 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParamsById(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 添加静态面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDiaglogVisible=true"
          >添加属性</el-button>

          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 扩展列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  class="item_tag"
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 可输入的input框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>

            <!-- 索引列 -->
            <el-table-column type="index" label="#"></el-table-column>

            <el-table-column label="属性名称" prop="attr_name"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 编辑 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editParamsById(scope.row)"
                >编辑</el-button>

                <!-- 删除 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParamsById(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数、属性对话框 -->
    <params-add
      :paramsVisible="addDiaglogVisible"
      :currentState="activeName"
      :cateId="cateId"
      @close="handleParamsAddClosed"
      @success="handleParamsAddSuccess"
    ></params-add>

    <!-- 修改参数、属性弹框 -->
    <params-edit
      ref="params"
      :editVisible="editDialogVisible"
      :currentState="activeName"
      :cateId="cateId"
      @close="handleParamsEditClosed"
      @success="handleParamsEditSuccess"
    ></params-edit>
  </div>
</template>

<script>
import { cateData,cateSort,paramsDelete } from '@/api/goods'
import ParamsAdd from './components/paramsAdd'
import ParamsEdit from './components/ParamsEdit'

export default {
  components:{
    ParamsAdd,
    ParamsEdit
  },

  data(){
    return{
      // 商品分类列表
      cateList:[],

      // 级联选择器的配置对象
      cateProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },

      // 级联选择器双向绑定到的数组
      selectedCateKeys:[],

      // 动态参数列表
      manyTableData:[],
      // 静态属性列表
      onlyTableData:[],

      // 被激活页标签的名称
      activeName:'many',

      // 控制添加参数、属性对话框的显示与隐藏
      addDiaglogVisible:false,
      // 控制修改参数、属性对话框的显示与隐藏
      editDialogVisible:false
    }
  },

  computed:{
    // 选中的三级分类的id
    cateId(){
      if(this.selectedCateKeys.length === 3){
        return this.selectedCateKeys[2]
      }
      return null
    },

    // 如果按钮需被禁用,返回true,否则返回false
    isBtnDisabled(){
      if(this.selectedCateKeys.length !== 3){
        return true
      }
      return false
    }
  },

  created(){
    this.getCateList()
  },

  methods:{
    // 获取分类列表数据
    getCateList(){
      cateData().then(res => {
        console.log(res);
        this.cateList = res.data
      }).catch(() => console.log('error'))
    },

    // 获取参数列表数据
    getParamsData(){
      // 如果选中的不是三级分类
      if(this.selectedCateKeys.length !== 3){
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      // 选中了三级分类（根据所选的分类id和当前所处的面板，获取对应的参数）
      cateSort({cateId:this.cateId,sel:this.activeName}).then(res => {
        console.log(res);

        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          // 控制文本对话框的显示与隐藏
          item.inputVisible = false
          // 文本框中输入的值
          item.inputValue = ''
        });

        if(this.activeName === 'many'){
          this.manyTableData = res.data
        }else{
          this.onlyTableData = res.data
        }

      }).catch(() => console.log('error'))

    },

    // 级联选择框变化会触发这个函数
    handleChange(){
      this.getParamsData()
    },

    // tab页签点击事件的处理
    handleTabClick(){
      console.log(this.activeName);
      this.getParamsData()
    },

    // 删除对应的参数可选项
    handleClose(i,row){
      row.attr_vals.splice(i,1)
      this.saveAttrVals(row)
    },

    // 文本框失去焦点，或按下enter键触发
    handleInputConfirm(row){
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
     // 如果没有return，则证明输入的内容，需要做后续处理
  
      row.attr_vals.push(row.inputValue.trim())
      console.log(row.attr_vals);
      row.inputValue = ''
      row.inputVisible = false
      // 需发起请求，保存这次操作
      this.saveAttrVals(row)
    },

    // 点击按钮，展示文本输入框
    showInput(row){
      row.inputVisible = true
      // $nextTick 方法，当页面上元素被重新渲染之后，才长指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 控制添加参数对话框的关闭事件
    handleParamsAddClosed(){
      this.addDiaglogVisible = false
    },

    // 处理添加参数成功后的操作
    handleParamsAddSuccess(){
      this.getParamsData()
      this.addDiaglogVisible = false
    },

    // 展示修改弹窗
    editParamsById(record){
      console.log(record);
      this.$refs.params.editParamsById(record)
      this.editDialogVisible = true
    },

    // 控制修改对话框的关闭事件
    handleParamsEditClosed(){
      this.editDialogVisible = false
    },

    // 处理修改弹窗的成功事件
    handleParamsEditSuccess(){
      this.getParamsData()
      this.editDialogVisible = false
    },

    // 根据id删除对应的参数
    removeParamsById(id){
      console.log(id);
      const confirmResult = this.$confirm(
        '此操作将永久删除该参数，是否继续？',
        '提示',
        {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          paramsDelete({cateId:this.cateId,attr_id:id}).then(res => {
            console.log(res);
            this.getParamsData()
          }).catch(()=>console.log('error'))
        }).catch(() => {
         this.$message.error('删除参数失败！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .cat_opt{
    margin-top: 30px;
  }

  .input-new-tag{
    width: 120px;
  }

  .show_table{
    margin-top: 10px;
  }

  .item_tag{
    margin: 5px 5px;
  }
</style>