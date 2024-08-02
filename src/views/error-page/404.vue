<template>
  <div class="page-container">
    <el-result>
      <template #icon>
        <img src="../../assets/images/404.png" alt="404" />
      </template>
      <template #title>
        <h2>404</h2>
      </template>
      <template #sub-title>
        <h4>抱歉, 没找到您想要访问的页面</h4>
      </template>
      <template #extra>
        <el-button type="primary" @click="backHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backHome = () => {
  router.replace("/");
};
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #F2F3F5;
  height: 100vh;
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
