<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible.sync="itemVisible"
      width="50%"
      @close="onClose"
    >
      <!-- 添加分类表单 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类">
          <el-cascader
            expand-trigger="hover"
            :options="parCateList"
            :props="cascaderProps"
            v-model="selectedKeys"
            @change="parentCateChanged"
            clearable
            filterable
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="cateAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cateAdd } from '@/api/goods'

export default {
  props: {
    cateVisible: {
      type: Boolean,
      default: false
    },
    cateParentData: {
      type: Array
    }
  },

  data() {
    return {
      // 添加分类的表单数据
      form: {
        cat_name: "",
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认添加一级分类
        cat_level: 0
      },

      // 分类表单验证规则
      rules: {
        cat_name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ]
      },

      // 指定级联选择器的配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },

      // 选中的父级分类的ID数组
      selectedKeys: []
    };
  },

  computed: {
    itemVisible: {
      get: function() {
        return this.cateVisible;
      },
      set: function() {}
    },
    parCateList: {
      get: function() {
        return this.cateParentData;
      },
      set: function() {}
    }
  },

  methods: {
    // 关闭弹窗事件
    onClose() {
      this.$refs.formRef.resetFields();
      this.selectedKeys = [];
      this.form.cat_level = 0;
      this.form.cat_pid = 0;
      this.$emit("close");
    },

    // 当级联选择器选项发生变化时触发
    parentCateChanged() {
      console.log(this.selectedKeys);
      // 父级分类的ID
      if (this.selectedKeys.length > 0) {
        this.form.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
        // 为当前分类等级赋值
        this.form.cat_level = this.selectedKeys.length;
        return;
      }else{
        // 父级分类的id
        this.form.cat_pid = 0
        this.form.cat_level = 0
      }
    },

    // 添加分类处理函数
    cateAdd(){
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        cateAdd(this.form).then(res => {
          console.log(res);
          this.$emit("success")
        })
      })
    }
  }
};
</script>
