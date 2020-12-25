<template>
  <div>
    <!-- 主题区域引入一张卡片 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-button type="primary" class="role_add" @click="addRoleDialogVisible=true">添加角色</el-button>

      <!-- 角色列表table -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
              :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']"
            >
            <!-- 渲染一级权限 -->
            <el-col :span="5">
              <el-tag 
                @close="removeRightById(scope.row,item1.id)"
                closable
              >
                {{item1.authName}}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <!-- 渲染二级和三级权限 -->
            <el-col :span="19">
              <el-row
                v-for="(item2,i2) in item1.children"
                :key="item2.id"
                :class="[i2 === 0 ? '' : 'bdtop','vcenter']"
              >
                <!-- 渲染二级列表 -->
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="removeRightById(scope.row,item2.id)"
                  >
                    {{item2.authName}}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 渲染三级列表 -->
                <el-col :span="18">
                  <el-tag 
                    v-for="item3 in item2.children" 
                    :key="item3.id"
                    type="warning"
                    closable=""
                    @close="removeRightById(scope.row,item3.id)"
                  >
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
            </el-row>

            <el-row :span="19"></el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 角色名称 -->
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <!-- 角色描述 -->
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editRole(scope.row)"

            >编辑</el-button>

            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleById(scope.row.id)"
            >删除</el-button>

            <!-- 分配权限 -->
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="rightsSet(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加、修改角色弹窗 -->
    <item-add 
      ref="item" 
      :roleVisible="addRoleDialogVisible"
      @close="handleRoleAddClosed"
      @success="handleRoleAdd"
    >
    </item-add>

    <!-- 分配权限弹窗 -->
    <rights-add
      ref="set"
      :setVisible="setRoleDialogVisible"
      @close="handleRoleSetClosed"
      @success="handleRoleSet"
    >
    </rights-add>

  </div>
</template>

<script>
import { roleShow,roleDelete, rightsDelete } from "@/api/rights";
import ItemAdd from './components/itemAdd'
import RightsAdd from './components/rightsAdd'

export default {
  // 注册组件
  components:{
    ItemAdd,
    RightsAdd
  },

  data(){
    return{
      // 角色列表数据
      roleList:[],
      // 控制添加、修改角色对话框的显示与隐藏
      addRoleDialogVisible:false,
      // 控制分配权限对话框的显示与隐藏
      setRoleDialogVisible:false
    }
  },

  created(){
    // 获取角色列表数据
    this.getRoleList()
  },

  methods:{
    // 获取角色列表
    getRoleList(){
      roleShow().then(res => {
        console.log(res);
        this.roleList = res.data
        console.log(this.roleList);
      }).catch(() => console.log('error'))
    },

    // 关闭添加、修改角色列表弹窗
    handleRoleAddClosed(){
      this.addRoleDialogVisible = false
    },

    // 关闭分配权限弹窗
    handleRoleSetClosed(){
       this.getRoleList()
      this.setRoleDialogVisible = false
    },

    // 展示修改弹窗
    editRole(record){
      console.log(record);
      this.$refs.item.editRole(record)
      this.addRoleDialogVisible = true
    },

    // 展示分配权限弹窗
    rightsSet(record){
      console.log(record);
      this.$refs.set.rightsSet(record)
      this.setRoleDialogVisible = true
    },

    // 添加、修改之后的提交处理
    handleRoleAdd(){
      this.addRoleDialogVisible = false,
      this.getRoleList()
    },

    // 分配权限成功之后的提交
    handleRoleSet(){
      this.setRoleDialogVisible = false
    },

    // 根据id删除角色信息
    removeRoleById(id){
      console.log(id);
      const confirmResult = this.$confirm(
        '此操作将永久删除角色，是否继续？',
        '提示',
        {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          roleDelete(id).then(res => {
            console.log(res);
            this.getRoleList()
          }).catch(()=>console.log('error'))
        }).catch(() => {
         this.$message.error('删除角色失败！')
        })
    },

    // 根据id删除对应的权限
    removeRightById(role,rightId){
      console.log(123);
      rightsDelete({role,rightId}).then(res => {
        console.log(res);
        role.children = res.data
      }).catch(()=>console.log('error'))
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table{
    margin-top: 20px;
  }

  // 为标签之间设置间隙
  .el-tag {
    margin: 7px;
  }
  .bdtop {
    border-top: 1px solid #eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>