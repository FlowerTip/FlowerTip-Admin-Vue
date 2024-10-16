<template>
  <div class="page-container">
    <el-result>
      <template #icon>
        <img src="../../assets/images/404.png" alt="404" />
      </template>
      <template #title>
        <h2>500</h2>
      </template>
      <template #sub-title>
        <h4>抱歉, 网络异常，请耐心等待，稍后再试</h4>
      </template>
      <template #extra>
        <el-button type="primary" @click="backHome" :icon="Back">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";

const router = useRouter();

const backHome = () => {
  router.replace("/");
};
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #fff;
  height: 100%;
}

img {
  width: 400px;
}

h2 {
  font-size: 40px;
  font-weight: 700;
}

h4 {
  font-size: 20px;
  font-weight: 700;
}
</style>
