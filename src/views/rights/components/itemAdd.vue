<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="itemVisible"
      width="50%"
      @close="onClose"
    >
      <!-- 内容主体区 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleAdd, roleEdit } from "@/api/rights";

export default {
  props: {
    roleVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 弹窗标题
      title: "添加角色",

      // 角色列表数据
      form: {
        roleName: "",
        roleDesc: ""
      },

      // 角色表单验证规则
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },

  computed: {
    itemVisible: {
      get: function() {
        return this.roleVisible;
      },
      set: function() {}
    }
  },

  methods: {
    // 关闭弹窗事件
    onClose() {
      this.$refs.formRef.resetFields();
      this.$emit("close");
    },

    // 根据id修改角色信息
    editRole(record) {
      this.form = record;
      this.title = "修改角色";
    },

    // 添加、修改角色
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 添加角色
          if (this.title == "添加角色") {
            roleAdd(this.form)
              .then(res => {
                this.$emit("success");
              })
              .catch(() => console.log("error"));
          } else {
            console.log(this.form);
            // 修改角色信息
            roleEdit(this.form)
              .then(res => {
                console.log(res);
                this.$emit("success");
              })
              .catch(() => console.log("error"));
          }
        }
      });
    }
  }
};
</script>
