<template>
  <div>
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="itemVisible"
      width="50%"
      @close="onClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { paramsAdd } from "@/api/goods";

export default {
  props: {
    paramsVisible: {
      type: Boolean,
      default: false
    },
    currentState: {
      type: String
    },
    cateId: {
      type: Number
    }
  },

  data() {
    return {
      // 添加参数表单数据
      form: {
        attr_name: ""
      },

      // 添加表单验证规则
      rules: {
        attr_name: [
          {
            required: true,
            message: "请输入参数名称",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    itemVisible: {
      get: function() {
        return this.paramsVisible;
      },
      set: function() {}
    },

    // 判断是动态参数还是静态属性
    titleText() {
      if (this.currentState === "many") {
        return "动态参数";
      }
      return "静态属性";
    }
  },

  methods: {
    onClose() {
      this.$refs.formRef.resetFields();
      this.$emit("close");
    },

    // 添加参数
    addParams() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        paramsAdd({
          cateId: this.cateId,
          attr_name: this.form.attr_name,
          attr_sel: this.currentState
        })
          .then(res => {
            console.log(res);
            this.$emit("success");
          })
          .catch(() => console.log("error"));
      });
    }
  }
};
</script>
