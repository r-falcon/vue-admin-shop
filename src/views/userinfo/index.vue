<template>
  <div>
    <!-- 主题区域引入一张卡片 -->
    <el-card>
      <!-- 输入框 -->
      <div class="input_box">
        <el-input placeholder="请输入搜索内容" class="input_con"></el-input>
        <el-button icon="el-icon-search" class="input_btn"></el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" class="user_add" @click="addDialogVisible=true"
          >添加用户</el-button
        >
      </div>

      <!-- 用户列表 -->
      <el-table border stripe :data="userList">
        <!-- 为表格添加索引列 -->
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <!-- 表格数据 -->
        <el-table-column
          prop="username"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          width="100"
        ></el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editUser(scope.row)"
            ></el-button>

            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            ></el-button>

            <el-tooltip 
              effect="dark" 
              content="分配角色" 
              placement="top" 
              :enterable="false"
            >
              <el-button 
                type="warning" 
                icon="el-icon-setting" 
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>

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
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加/修改用户弹窗 -->
    <item-add 
      ref="item" 
      :userVisible="addDialogVisible"
      @close="handleUserAddClosed"
      @success="handleUserAdd"
    >
    </item-add>

    <!-- 分配用户角色弹窗 -->
    <item-setting
      ref="set"
      :setVisible="setDialogVisible"
      @close="handleSetRoleClosed"
      @success="handleSetDone"
    ></item-setting>
  </div>
</template>

<script>
import { userData,userState,userGetById,userDelete } from "@/api/user";
import ItemAdd from './itemAdd'
import ItemSetting from './itemSetting'


export default {
  // 注册组件
  components:{
    ItemAdd,
    ItemSetting
  },

  data() {
    return {
      // 控制添加用户、修改用户对话框的显示与隐藏
      addDialogVisible:false,
      // 控制分配角色对话框的显示与隐藏
      setDialogVisible:false,


      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      total:0,
      // 用户列表数据
      userList: [],
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    // 关闭添加/修改用户弹窗
    handleUserAddClosed(){
      this.addDialogVisible = false
    },
    // 修改提交后的处理
    handleUserAdd(){
      this.addDialogVisible = false
      this.getUserList()
    },

    // 关闭分配角色弹窗
    handleSetRoleClosed(){
      this.setDialogVisible = false
    },
    // 修改角色后的处理
    handleSetDone(){
      this.setDialogVisible = false
      this.getUserList()
    },

    // 展示修改弹窗
    editUser(record){
      console.log(record);
      this.$refs.item.editUser(record)
      this.addDialogVisible = true
    },

    // 展示分配角色弹窗
    setRole(record){
      console.log(record);
      this.$nextTick(() => {
        this.$refs.set.setRole(record)
      })
      this.setDialogVisible = true
    },
    
    // 获取用户列表
    getUserList() {
      userData(this.queryInfo)
        .then(res => {
          console.log(res);
          this.userList = res.data.users;
          this.total = res.data.total
        })
        .catch(() => {
          console.log("error");
        });
    },

    // 更新用户状态
    userStateChanged(userinfo){
      // console.log(userinfo);
      userState(userinfo).then(res =>{
        console.log(res)
      }).catch(() => console.log('error'))
    },

    // 根据用户id删除用户信息
    removeUserById(id){
      console.log(id);
      const confirmResult = this.$confirm(
        '此操作将永久删除用户，是否继续？',
        '提示',
        {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          userDelete(id).then(res => {
            console.log(res);
            this.getUserList()
          }).catch(()=>console.log('error'))
        }).catch(() => {
         this.$message.error('删除用户失败！')
        })
    },

    // 监听pageSize改变事件
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },

    // 监听页码值改变事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getUserList()
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  width: 95%;
  min-height: 400px;
  margin: 20px auto 0;

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

  .el-table {
    margin-top: 20px;
  }

  .el-pagination{
    margin-top: 20px;
  }
}
</style>
