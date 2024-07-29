<template>
  <div class="img-list-container">
    <el-upload
      ref="imgListRef"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      class="img-list-uploader"
      :class="uploadClassName"
      :multiple="true"
      :disabled="disabled"
    >
      <el-icon>
        <Plus />
      </el-icon>

      <template #file="{ file }">
        <div class="img-list-wrapper">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt="thumbnail"
          />
          <div class="upload-hover">
            <div class="btn-item" @click.stop="previewAvatar(file)">
              <el-icon class="icon-style"> <ZoomIn /> </el-icon>查看
            </div>
            <div class="btn-item" @click.stop="delAvatar(file)">
              <el-icon class="icon-style"> <Delete /> </el-icon>删除
            </div>
          </div>
        </div>
      </template>
    </el-upload>
    <!-- 大图预览 -->
    <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[imageUrl]"
      @close="imgViewVisible = false"
    />
    <!-- 提示文案 -->
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { UploadFile } from "element-plus";

type AvatarProps = {
  width: string;
  height: string;
  disabled: boolean;
};

const props = withDefaults(defineProps<AvatarProps>(), {
  width: "240px",
  height: "164px",
  disabled: false,
});

console.log(props, "props@@@");

const uploadClassName = ref({
  disabled: props.disabled,
});
const imgListRef = ref();

const imageUrl = ref("");

const delAvatar = (file: UploadFile) => {
  imgListRef.value!.handleRemove(file);
  imageUrl.value = "";
};
const imgViewVisible = ref(false);
const previewAvatar = (file: UploadFile) => {
  console.log(file, "fileasdasd");
  imageUrl.value = file.url as string;
  imgViewVisible.value = true;
};
</script>

<style lang="scss">
.img-list-container {
  .img-list-uploader {
    &.disabled {
      .el-upload {
        background-color: #f3f3f3 !important;
        border: 1px dashed var(--el-border-color-darker) !important;
      }

      &:hover {
        .el-upload {
          border: 1px dashed var(--el-border-color-darker);
        }
      }
    }

    .el-upload-list {
      width: 100%;
      height: 100%;

      .el-upload {
        width: v-bind(width);
        height: v-bind(height);
        background-color: #fff;
      }

      .el-upload-list__item {
        width: v-bind(width);
        height: v-bind(height);

        &.is-ready {
          cursor: pointer;

          &:hover {
            .upload-hover {
              visibility: visible;
            }
          }
        }

        .img-list-wrapper {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .upload-hover {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    z-index: 1;
    visibility: hidden;
  }

  .btn-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    z-index: 9;
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    .icon-style {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
}
</style>
