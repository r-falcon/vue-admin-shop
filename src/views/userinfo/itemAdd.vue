<template>
  <div>
    <el-dialog :title="title" :visible.sync="itemVisible" width="50%" @close="onClose">
      <el-form :model="form" :rules="title === '修改用户' ? editRules : rules  " ref="formRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="this.title === '修改用户' ? true : false"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :style="{display:title === '修改用户' ? 'none' : 'block'}">
          <el-input
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userAdd, userEdit } from "@/api/user";
// 引入校验规则
import verify from '@/api/verify.js'

export default {
  props: {
    userVisible:{
      type:Boolean,
      default:false
    }
  },

  data() {
    return {
      // 弹窗标题
      title: "添加用户",

      // 用户表单数据
      form:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },

      // 用户表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3~5个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在6-15个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "邮箱长度在6-15个字符之间",
            trigger: "blur"
          },
          { validator: verify.FormValidate.Form().validEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: verify.FormValidate.Form().validMobile, trigger: "blur" }
        ]
      },

      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },

      // 修改用户id
      userId: 0,
    };
  },

  computed:{
    editRules(){
      delete this.rules['password']
      return this.rules
    },
    
    itemVisible:{
      get:function(){
        return this.userVisible
      },
      set:function(){}
    }
  },

  methods: {
    // 关闭弹窗事件
    onClose() {
      this.$refs.formRef.resetFields()
      this.$emit("close");
    },

    // 根据id修改用户信息
    editUser(record) {
      this.form = record
      console.log(record)
      this.title = "修改用户";
      console.log(this.editRules)
      console.log(this.itemVisible)
    },

    // 添加/修改用户
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 新增用户信息
          if (this.title === "添加用户") {
            userAdd(this.form)
              .then(res => {
                console.log(res);
                this.$emit("success");
              })
              .catch(() => console.log("error"));
          } else {
            // 修改用户信息
            userEdit(this.form)
              .then(res => {
                console.log(res);
                this.$emit("success")
              })
              .catch(() => console.log("error"));
          }
        }
      });
    }
  }
};
</script>
