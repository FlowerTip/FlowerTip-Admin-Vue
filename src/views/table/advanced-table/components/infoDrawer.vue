<!-- 查看学员抽屉 -->
<template>
  <el-drawer v-model="drawerVisiable" direction="rtl">
    <template #header>
      <h4>学员信息</h4>
    </template>
    <template #default>
      <div class="form-layout-wrapper">
        <div class="form-container">
          <div class="form-item">
            <span class="label">姓名：</span>
            <span class="value">{{ detailInfo.username }}</span>
          </div>
          <div class="form-item">
            <span class="label">年龄：</span>
            <span class="value">{{ detailInfo.age }}</span>
          </div>
          <div class="form-item">
            <span class="label">地址：</span>
            <span class="value">{{ detailInfo.address }}</span>
          </div>
          <div class="form-item">
            <span class="label">性别：</span>
            <span class="value">{{ detailInfo.sexLabel }}</span>
          </div>
          <div class="form-item">
            <span class="label">个头大小：</span>
            <span class="value">{{ detailInfo.bigLabel }}</span>
          </div>
          <div class="form-item">
            <span class="label">性格色彩：</span>
            <span class="value">{{ detailInfo.color }}</span>
          </div>
          <div class="form-item">
            <span class="label">兴趣爱好：</span>
            <span class="value">{{ detailInfo.hobby }}</span>
          </div>
          <div class="form-item">
            <span class="label">学校名称：</span>
            <span class="value">{{ detailInfo.school }}</span>
          </div>
          <div class="form-item">
            <span class="label">档案时间：</span>
            <span class="value">{{ detailInfo.time }}</span>
          </div>
          <div class="form-item image">
            <span class="label">学员头像：</span>
            <span class="value">
              <img :src="detailInfo.avatarUrl" :alt="detailInfo.avatarUrl" />
            </span>
          </div>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const drawerVisiable = ref(false);

const dialogProps = ref();

const detailInfo = computed(() => {
  return dialogProps.value.detailInfo;
});

type AcceptParams = {
  detailInfo: StudentItem;
};

// 接收父组件参数
const acceptParams = (params: AcceptParams) => {
  dialogProps.value = params;
  drawerVisiable.value = true;
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.form-layout-wrapper {
  .form-container {
    .form-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 20px;
      color: var(--el-text-color-regular);

      &.image {
        height: 148px;

        .value {
          border: 0;
          padding: 0;
        }

        img {
          display: block;
          width: 148px;
          height: 148px;
        }
      }

      .label {
        width: 120px;
        padding-right: 10px;
        text-align: right;
      }

      .value {
        flex: 1;
        background-color: #fff;
        padding: 0 10px;
        border: 1px solid #ebeef5;
      }
    }
  }
}
</style>
