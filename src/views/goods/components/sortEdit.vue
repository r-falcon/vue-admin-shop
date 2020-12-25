<template>
  <div>
    <el-dialog
      title="修改分类信息"
      :visible.sync="itemVisible"
      width="50%"
      @close="onClose"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cateEdit } from '@/api/goods'

export default {
  props:{
    editVisible:{
      type:Boolean,
      default:false
    }
  },

  data(){
    return{
      // 分类信息列表
      form:{
        cat_id:'',
        cat_name:''
      },

      // 分类信息验证规则
      rules:{
        cat_name:[
          {
            required:true,message:'请输入分类名称',trigger:'blur'
          }
        ]
      }
    }
  },

  computed:{
    itemVisible:{
      get:function(){
        return this.editVisible
      },
      set:function(){}
    }
  },

  methods:{
    // 对话框关闭
    onClose(){
      this.$refs.formRef.resetFields();
      this.$emit('close')
    },

    // 根据id修改分类信息
    editCateById(record){
      this.form = record
    },

    // 编辑分类
    editCate(){
      console.log(123);
      cateEdit(this.form).then(res => {
        console.log(res);
        this.$emit('success')
      }).catch(() => console.log('error'))
    }
  }
}
</script>