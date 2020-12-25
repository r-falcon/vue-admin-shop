<template>
  <div>
    <el-dialog
      title="编辑订单信息"
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
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="form.address1"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="form.address2"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
         <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onClose">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入级联选择器城市数据
import cityData from '../cityData.js'

export default {
  props:{
    orderVisible:{
      type:Boolean,
      default:false
    }
  },

  data(){
    return{
      // 修改表单数据
      form:{
        address1:[],
        address2:''
      },

      // 修改表单数据验证规则
      rules:{
        address1:[
          {
            required:true,message:'请选择省市区县',trigger:'blur'
          }
        ],
        address2:[
          {
            required:true,message:'请填写详细地址',trigger:'blur'
          }
        ]
      },

      // 级联选择器城市数据
      cityData
    }
  },

  computed:{
    itemVisible:{
      get:function(){
        return this.orderVisible
      },
      set:function(){}
    }
  },

  methods:{
    onClose(){
      this.$refs.formRef.resetFields();
      this.$emit('close')
    }
  }
}
</script>