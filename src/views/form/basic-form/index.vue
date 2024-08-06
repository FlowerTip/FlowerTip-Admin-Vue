<template>
  <div class="basic-form">
    <div class="tip-wrapper">
      <el-alert type="warning" :closable="false">
        <template #title>
          <p>1. 可以在options配置form表单的属性，以及columns数组配表单项实现表单的动态化展示</p>
          <p>2. form属性主要配置表单组件，可用的组件属性同el-form配置项</p>
          <p>3. columns数组用来配置表单项，formItem属性用来配置el-form-item的组件属性</p>
          <p>4. attrs属性用来配置，表单项中Element Plus 中 el-input el-select等组件，同配置</p>
        </template>
      </el-alert>
    </div>
    <ProForm :formOption="options" ref="basicFormRef">
      <!-- 表格操作 -->
      <template #operation>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="default" @click="cancelSubmit">重置</el-button>
      </template>
    </ProForm>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import ProForm from '@/components/ProForm/index.vue'

const options = ref({
  // 表单整体配置项
  form: {
    inline: false,
    labelPosition: "right",
    labelWidth: "80px",
    size: "default",
    disabled: false,
    labelSuffix: " :"
  },
  // 表单列配置项 (formItem 代表 item 配置项，attrs 代表 输入、选择框 配置项)
  columns: [
    {
      formItem: {
        label: "城市",
        prop: "city",
        labelWidth: "80px",
        rules: [
          { required: true, message: '城市名不能为空', trigger: 'blur' }
        ]
      },
      attrs: {
        typeName: "input",
        clearable: true,
        placeholder: "请输入所在的城市",
        style: "width: 500px"
      }
    },
    {
      formItem: {
        label: "喜好",
        prop: "hobby",
        rules: [
          { required: true, message: '请选择你的喜好', trigger: 'change' }
        ]
      },
      attrs: {
        typeName: "select",
        clearable: true,
        placeholder: "请选择你的喜好",
        style: "width: 500px",
        selectOptions: [
          {
            value: '1',
            label: '打篮球'
          },
          {
            value: '2',
            label: '公路车'
          }
        ]
      }
    },
    {
      formItem: {
        label: "邮箱",
        prop: "email",
        rules: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ]
      },
      attrs: {
        typeName: "input",
        placeholder: "请输入邮箱",
        clearable: true,
        style: "width: 500px"
      }
    }
  ]
});

const basicFormRef = ref();

const submitForm = () => {
  basicFormRef.value.submitForm();
}

const cancelSubmit = () => {
  basicFormRef.value.resetForm();
}


</script>

<style lang="scss" scoped>
.basic-form {
  height: 100%;
  background-color: #fff;

  .tip-wrapper {
    margin-bottom: 20px;
    padding: 20px;
  }
}
</style>
