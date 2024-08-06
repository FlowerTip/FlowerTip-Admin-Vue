<template>
  <div class="step-form">
    <div class="form-box">
      <el-steps :active="acitveIndex" finish-status="finish" align-center>
        <el-step title="填写转账信息" />
        <el-step title="确认转账信息" />
        <el-step title="完成" />
      </el-steps>
      <div class="form-wrap">
        <ProForm :formOption="options" ref="basicFormRef">
          <!-- 表格操作 -->
          <template #operation>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="default" @click="cancelSubmit">重置</el-button>
          </template>
        </ProForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ProForm from "@/components/ProForm/index.vue";

const options = ref({
  // 表单整体配置项
  form: {
    inline: false,
    labelPosition: "right",
    labelWidth: "80px",
    size: "default",
    disabled: false,
    labelSuffix: " :",
  },
  // 表单列配置项 (formItem 代表 item 配置项，attrs 代表 输入、选择框 配置项)
  columns: [
    {
      formItem: {
        label: "城市",
        prop: "city",
        labelWidth: "80px",
        rules: [{ required: true, message: "城市名不能为空", trigger: "blur" }],
      },
      attrs: {
        typeName: "input",
        clearable: true,
        placeholder: "请输入所在的城市",
        style: "width: 500px",
      },
    },
    {
      formItem: {
        label: "喜好",
        prop: "hobby",
        rules: [
          { required: true, message: "请选择你的喜好", trigger: "change" },
        ],
      },
      attrs: {
        typeName: "select",
        clearable: true,
        placeholder: "请选择你的喜好",
        style: "width: 500px",
        selectOptions: [
          {
            value: "1",
            label: "打篮球",
          },
          {
            value: "2",
            label: "公路车",
          },
        ],
      },
    },
    {
      formItem: {
        label: "邮箱",
        prop: "email",
        rules: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
      },
      attrs: {
        typeName: "input",
        placeholder: "请输入邮箱",
        clearable: true,
        style: "width: 500px",
      },
    },
  ],
});

const basicFormRef = ref();

const submitForm = () => {
  nextStep();
  basicFormRef.value.submitForm();
};

const cancelSubmit = () => {
  basicFormRef.value.resetForm();
};

const acitveIndex = ref(0);

const nextStep = () => {
  acitveIndex.value++;
};
</script>

<style lang="scss" scoped>
.step-form {
  height: 100%;
  background-color: #fff;
  padding: 20px;

  .form-box {
    width: 65%;
    margin: 0 auto;
    height: 100%;
  }
  .form-wrap {
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }
}
</style>
