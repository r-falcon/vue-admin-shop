<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible.sync = "disVisible"
      width="50%"
      @close="onClose"
    >
      <div>
        <p>当前用户：{{userInfo.username}}</p>
        <p>当前角色：{{userInfo.role_name}}</p>
        <p>
          分配角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="setRoleInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleData,roleSet } from "@/api/user";

export default {
  props:{
    setVisible:{
      type:Boolean,
      default:false
    }
  },
  
  data(){
    return{
      // 需要分配角色用户信息
      userInfo:{},
      // 所有角色列表数据
      roleList:[],
      // 已选中的角色id
      selectedRoleId:''
    }
  },

  computed:{
     disVisible:{
      get:function(){
        return this.setVisible
      },
      set:function(){}
    }
  },

  methods:{
    // 根据id修改用户信息
    setRole(record) {
      this.userInfo = record
      // 获取所有的用户角色
      roleData().then(res => {
        console.log(res);
        this.roleList = res.data
      }).catch(() => console.log('error')) 
    },

    // 关闭弹窗
    onClose(){
      this.selectedRoleId = ''
      this.userInfo = {}
      this.$emit("close");
    },

    // 分配用户角色
    setRoleInfo(){
      if(!this.selectedRoleId){
        return this.$message.error('请选择要分配的角色')
      }

      roleSet(this.userInfo,this.selectedRoleId).then(res => {
        console.log(res);
        this.$emit('success')
      }).catch(() => console.log('error'))
    }
  }
}
</script>