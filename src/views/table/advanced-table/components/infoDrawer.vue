<template>
  <el-dialog title="学员信息" v-model="drawerVisiable" width="800px" draggable>
    <template #default>
      <div class="form-layout-wrapper">
        <div class="form-container">
          <el-row :gutter="16">
            <el-col :span="12">
              <div class="form-item">
                <span class="label">姓名：</span>
                <span class="value">{{ detailInfo.username }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">年龄：</span>
                <span class="value">{{ detailInfo.age }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">地址：</span>
                <span class="value">{{ detailInfo.address }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">性别：</span>
                <span class="value">{{ detailInfo.sexLabel }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">个头大小：</span>
                <span class="value">{{ detailInfo.bigLabel }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">性格色彩：</span>
                <span class="value">{{ detailInfo.color }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">兴趣爱好：</span>
                <span class="value">{{ detailInfo.hobby }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">学校名称：</span>
                <span class="value">{{ detailInfo.school }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item">
                <span class="label">档案时间：</span>
                <span class="value">{{ detailInfo.time }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item image">
                <span class="label">学员头像：</span>
                <span class="value">
                  <el-image class="img" :alt="detailInfo.avatarUrl" :src="detailInfo.avatarUrl" :zoom-rate="1.2" :max-scale="7"
                    :min-scale="0.2" :preview-src-list="[detailInfo.avatarUrl]" show-progress :initial-index="4"
                    fit="cover" />
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const drawerVisiable = ref(false);

const dialogProps = ref();

const detailInfo = computed<StudentItem>(() => {
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
  padding: 20px 10px;

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
        align-items: flex-start;
        .value {
          border: 0;
          padding: 0;
        }

        .img {
          display: block;
          width: 148px;
          height: 148px;
          border: 1px dotted #ebeef5;
          cursor: pointer;
        }
      }

      .label {
        width: 80px;
        padding-right: 10px;
        text-align: left;
      }

      .value {
        flex: 1;
        background-color: #fff;
        padding: 0 10px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
      }
    }
  }
}
</style>
