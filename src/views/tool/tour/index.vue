<template>
  <div class="container">
    <el-button type="primary" @click="open = true">开始演示</el-button>

    <el-divider />

    <el-space>
      <el-button ref="ref1">上传</el-button>
      <el-button ref="ref2" type="primary">配置</el-button>
      <el-button ref="ref3" :icon="MoreFilled" />
    </el-space>

    <el-tour v-model="open">
      <el-tour-step :target="ref1?.$el" title="上传文件">
        <img style="width: 240px" src="https://element-plus.org/images/element-plus-logo.svg" alt="tour.png" />
        <div>发布你的站点</div>
      </el-tour-step>
      <el-tour-step :target="ref2?.$el" title="保存配置" description="保存你的配置" />
      <el-tour-step :target="ref3?.$el" title="详情信息" description="查看你的详情信息" />
    </el-tour>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import type { ButtonInstance } from 'element-plus'

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

const open = ref(false)
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
}
</style>