<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible.sync = "itemVisible"
      width="50%"
      @close="onClose"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      >
      </el-tree>
      <!-- 底部确定取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="setRights">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rightsData,rightsAttr } from "@/api/rights";

export default {
  props:{
    setVisible:{
      type:Boolean,
      default:false
    }
  },

  data(){
    return{
      // 权限列表数据
      rightsList:[],
      // 树形控件的属性绑定对象
      treeProps:{
        label:'authName',
        children:'children'
      },
      // 默认选中的节点id值数组
      defKeys:[105,116],
      // 当前即将分配权限的角色ID
      roleId:[]
    }
  },

  computed:{
    itemVisible:{
      get:function(){
        return this.setVisible
      },
      set:function(){}
    }
  },

  created(){
    // 获取权限列表
    this.getRightsList()
  },


  methods:{
    // 关闭弹窗事件
    onClose(){
      this.defKeys=[],
      this.$emit('close')
    },

    // 获取权限列表
    getRightsList(record){
      rightsData().then(res => {
        console.log(res);
        this.rightsList = res.data
        console.log(record);
        console.log(this.defKeys);
        this.getLeafKeys(record,this.defKeys)
      }).catch(()=>console.log('error'))
    },

    // 通过递归形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node,arr){
      // 如果当前节点不包含children属性，则为三级节点
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item,arr)
      });
    },

    // 分配权限弹窗
    rightsSet(record){
      console.log(record);
      this.roleId = record.id
      console.log(this.roleId);
      this.getRightsList(record)
    },

    // 分配权限
    setRights(){
      // this.getRightsList()
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      console.log(idStr)
      rightsAttr({roleId:this.roleId,rids:idStr}).then(res =>{
        console.log(res);
        this.$emit('success')
      }).catch(()=>console.log('error')) 
    }

  }
}
</script>