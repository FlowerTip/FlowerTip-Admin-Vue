<template>
  <div class="page-container">
    <el-result>
      <template #icon>
        <img src="../../assets/images/404.png" alt="404" />
      </template>
      <template #title>
        <h2>403</h2>
      </template>
      <template #sub-title>
        <h4>抱歉, 您没有权限访问该页面，请联系管理员</h4>
      </template>
      <template #extra>
        <el-button type="primary" @click="backHome" :icon="Back"
          >返回首页</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Back } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/userStore";

const userStore = useUserStore();

const router = useRouter();

const backHome = () => {
  if (userStore.authMenuList.length === 0) {
    userStore.logout();
    router.replace("/login");
    return;
  }
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
