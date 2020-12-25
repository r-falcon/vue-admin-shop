<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示信息条 -->
      <el-alert
        :title="title"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <!-- 基本信息tab面板 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="price">
              <el-input v-model="form.goods_price" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="form.goods_weight" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="form.goods_number" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="form.goods_cat"
                :options="cateList"
                :props="cascaderProps"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品参数面板 -->
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item
              v-for="item in manyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <!-- 复选框组 -->
              <el-checkbox-group v-model="forData">
                <el-checkbox
                  :label="items"
                  v-for="(items, indexs) in forData"
                  :key="indexs"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品属性面板 -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品图片面板 -->
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传图片 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headerObj"
              list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <!-- 商品内容面板 -->
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
            <!-- 添加商品 -->
            <el-button type="primary" class="btnAdd" @click="addGoods"
              >提交</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 处理图片预览 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="50%"
    >
      <img :src="picPreviewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import { goodsCate, cateSort, GoodsAdd, GoodsEdit } from "@/api/goods";
// 深拷贝
import _ from "lodash";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      // 添加 or 修改
      title: "添加商品信息",

      // 步骤条默认激活，与左侧tab栏联动
      activeIndex: "0",

      // 添加商品表单对象
      form: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属分类数组
        goods_cat: [],
        // 图片数组
        pics: [],
        // 商品详情描述
        goods_introduce: "",
        attrs: []
      },

      // 添加表单验证规则
      rules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        goods_weight: [
          {
            required: true,
            message: "请输入商品重量",
            trigger: "blur"
          }
        ],
        goods_number: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur"
          }
        ],
        goods_cat: [
          {
            required: true,
            message: "请输入商品分类",
            trigger: "blur"
          }
        ]
      },

      // 商品列表数据
      cateList: [],

      // 级联选择器配置
      cascaderProps: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },

      // 动态参数列表
      manyTableData: [],
      // 静态属性列表
      onlyTableData: [],
      // 动态参数vals数组
      forData: [],

      // 图片上传地址
      uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      // 图片上传组件的请求对象
      headerObj: {
        Authorization: getToken()
      },
      // 图片路径
      picPreviewPath: "",
      // 图片预览弹窗的显示与隐藏
      previewDialogVisible: false
    };
  },

  computed: {
    getCateId() {
      if (this.form.goods_cat.length === 3) {
        return this.form.goods_cat[2];
      }
      return null;
    }
  },

  created() {
    // 获取商品列表数据
    this.getCateList();
    if (this.$route.query.record) {
      this.title = "修改商品信息";
      this.form = this.$route.query.record;
    }
  },

  methods: {
    // 为选中商品分类阻止进行tab栏的跳转
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.form.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
    },

    // 标签被选中时触发
    tabClicked() {
      console.log(this.activeIndex);
      // 获取动态参数列表
      if (this.activeIndex === "1") {
        cateSort({ cateId: this.getCateId, sel: "many" })
          .then(res => {
            console.log(res);
            res.data.forEach(item => {
              item.attr_vals.length === 0 ? [] : item.attr_vals.split("");
            });
            this.manyTableData = res.data;
            this.forData = this.manyTableData[0].attr_vals.split(" ");
          })
          .catch(() => console.log("error"));
      } else if (this.activeIndex === "2") {
        // 获取静态属性列表
        cateSort({ cateId: this.getCateId, sel: "only" }).then(res => {
          console.log(res);
          this.onlyTableData = res.data;
        });
      }
    },

    // 获取商品分类列表数据
    getCateList() {
      goodsCate()
        .then(res => {
          console.log(res);
          this.cateList = res.data;
        })
        .catch(() => console.log("error"));
    },

    // 级联选择器选项变化时触发
    handleChange() {
      if (this.form.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },

    // 监听图片上传成功事件
    handleSuccess(response) {
      console.log(response);
      // 拼接得到一个图片信息对象，临时路径
      const picInfo = { pic: response.data.tem_path };
      // 将图片信息对象push到pics数组中
      this.form.pics.push(picInfo);
    },

    // 处理图片预览
    handlePreview(file) {
      console.log(file);
      this.picPreviewPath = file.url;
      this.previewDialogVisible = true;
    },

    // 处理移除图片
    handleRemove(file) {
      // 获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path;
      // 从pics数组中，找到图片对应的索引值
      const i = this.form.pics.findIndex(x => x.pic === filePath);
      // 调用splice方法，移除图片信息
      this.form.splice(i, 1);
    },

    // 添加商品
    addGoods() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项");
        }

        // 将form进行深拷贝
        const addForm = _.cloneDeep(this.form);
        addForm.goods_cat = addForm.goods_cat.join(",");

        if (this.title === "添加商品信息") {
          // 处理动态参数
          this.manyTableData.forEach(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            };
            this.form.attrs.push(newInfo);
          });

          // 处理静态属性
          this.onlyTableData.forEach(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            };
            this.form.attrs.push(newInfo);
          });

          addForm.attrs = this.form.attrs;
          console.log(addForm);

          // 添加商品请求处理
          GoodsAdd(addForm)
            .then(res => {
              console.log(res);
              this.$router.push("../goodsList");
            })
            .catch(() => console.log("error"));
        } else {
          GoodsEdit(addForm)
            .then(res => {
              console.log(res);
              this.$router.push("../goodsList");
            })
            .catch((req) => console.log(req));
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-steps {
  margin-top: 50px;
}

.el-tab-pane {
  margin-top: 30px;
}

.el-checkbox {
  margin: 0 8px 0 0 !important;
}

.previewImg {
  width: 100%;
}

.btnAdd {
  margin-top: 15px;
}
</style>
