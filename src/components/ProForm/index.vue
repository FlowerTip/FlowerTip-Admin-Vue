<template>
  <div class="pro-form-wrapper">
    <component
      :is="'el-form'"
      v-bind="formOption.form"
      ref="proFormRef"
      :model="model"
    >
      <template v-for="item in formOption.columns" :key="item.prop">
        <component :is="'el-form-item'" v-bind="item.formItem">
          <template v-if="item.attrs.typeName === 'select'">
            <component
              :is="`el-${item.attrs.typeName}`"
              v-bind="item.attrs"
              v-model="model[item.formItem.prop]"
            >
              <el-option
                v-for="option in item.attrs.selectOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </component>
          </template>
          <template v-else>
            <component
              :is="`el-${item.attrs.typeName}`"
              v-bind="item.attrs"
              v-model="model[item.formItem.prop]"
            />
          </template>
        </component>
      </template>
      <el-form-item>
        <slot name="operation"></slot>
      </el-form-item>
    </component>
  </div>
</template>

<script setup lang="ts" name="proForm">
import { ref } from "vue";

let model = ref<any>({});

defineProps(["formOption"]);

const proFormRef = ref();

const submitForm = () => {
  proFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log(model.value);
    } else {
      console.log("表单信息填写错误");
    }
  });
};

const resetForm = () => {
  proFormRef.value.resetFields();
};

defineExpose({
  submitForm,
  resetForm,
});
</script>

<style scoped lang="scss">
.el-form {
  width: 100%;
}
</style>
