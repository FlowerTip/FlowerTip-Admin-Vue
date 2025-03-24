<template>
  <div class="avatar-container">
    <el-upload
      :id="uuid"
      ref="avatarRef"
      class="avatar-uploader"
      :class="uploadClassName"
      :style="avatarStyle"
      action="#"
      :auto-upload="false"
      :show-file-list="false"
      :accept="fileType.join(',')"
      :on-change="handleAvatarChange"
      :http-request="httpRequest"
      :file-list="fileList"
      :disabled="hiddenTip"
    >
      <!-- 图片显示区域 -->
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        :style="avatarStyle"
        alt="avatar"
      />
      <!-- 上传图标显示区域 -->
      <el-icon v-else class="avatar-uploader-icon" :style="avatarStyle">
        <Plus />
      </el-icon>
      <!-- 操作按钮组遮罩层 -->
      <div v-if="imageUrl" class="upload-hover">
        <div class="btn-item" @click.stop="editImg">
          <el-icon class="icon-style">
            <Edit />
          </el-icon>
          编辑
        </div>
        <div class="btn-item" @click.stop="previewAvatar">
          <el-icon class="icon-style">
            <ZoomIn /> </el-icon
          >查看
        </div>
        <div class="btn-item" @click.stop="delAvatar">
          <el-icon class="icon-style">
            <Delete /> </el-icon
          >删除
        </div>
      </div>
    </el-upload>
    <!-- 大图预览 -->
    <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[imageUrl]"
      @close="imgViewVisible = false"
    />
    <!-- 提示文案 -->
    <div v-if="!hiddenTip" class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="Avatar">
import { computed, inject, onMounted, ref, useAttrs } from "vue";
import { Plus, ZoomIn, Edit, Delete } from "@element-plus/icons-vue";
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadRawFile,
  UploadRequestOptions,
  UploadProps,
} from "element-plus";
import { ElMessage, formContextKey, formItemContextKey } from "element-plus";
import { reqUploadAvatar } from "@/api/upload";
import { generateUUID } from "@/utils/tool";

const attrs = useAttrs();

// 接收外部传入的组件属性
const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    type?: "round" | "circle";
    disabled?: boolean;
    fileType?: string[];
    fileSize?: number;
    uploadParam?: {
      id: string;
      [key: string]: any;
    };
  }>(),
  {
    width: 164,
    height: 164,
    type: "round",
    disabled: false,
    fileType: () => ["image/jpeg", "image/png", "image/gif"],
    fileSize: 2,
    uploadParam: () => ({ id: "" }),
  }
);
// 设置组件唯一的uuid
const uuid = ref("id-" + generateUUID());
// 设置组件的ref
const avatarRef = ref<UploadInstance>();

// 组件的宽高，默认限制不能宽度不能小于164，高度不能小于164
const w = Number(props.width) > 164 ? props.width + "px" : "164px";
const h = Number(props.height) > 164 ? props.height + "px" : "164px";

// 设置组件的行内样式
const avatarStyle = ref({
  width: w,
  height: h,
});

// 设置组件的类型样式（圆形组件和方形组件，以及禁用上传时的样式）
const uploadClassName = ref({
  circle: props.type === "circle",
  disabled: props.disabled,
});

// disabled: true 禁用上传组件和隐藏提示文案
const hiddenTip = computed(() => {
  return props.disabled || imageUrl.value.length > 0;
});

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);

// 头像地址
const imageUrl = ref("");
// 文件列表
const fileList = ref<any[]>([]);

// 自定义事件，更新外部属性 v-model:image-url
const emit = defineEmits<{
  "update:imageUrl": [value: string];
  "update:successed": [value: boolean];
  "update:isModifyed": [value: boolean];
}>();

const isEditModel = ref(false);

onMounted(() => {
  if (attrs["image-url"]) {
    imageUrl.value = attrs["image-url"] as string;
    isEditModel.value = true;
  }
});

/**
 * 当上传组件的 auto-upload="false" 时
  只能通过on-change事件来处理上传前，上传时，成功后的处理逻辑
 */
const handleAvatarChange: UploadProps["onChange"] = (
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  fileList.value = uploadFiles;
  const rawFile: UploadRawFile = uploadFile.raw!;
  const isImgSize = rawFile.size / 1024 / 1024 < props.fileSize;
  const isImgType = props.fileType.includes(rawFile.type);

  if (!isImgType) {
    ElMessage.error("图片格式不正确");
    imageUrl.value = "";
    fileList.value = [];
    return;
  }
  if (!isImgSize) {
    ElMessage.error("图片超过限制大小");
    imageUrl.value = "";
    fileList.value = [];
    return;
  }
  emit("update:isModifyed", true);
  console.log(uploadFile, "uploadFile@@@");
  if (uploadFile.response) {
    const { code, data }: any = uploadFile.response;
    if (code === 200 && data.url) {
      imageUrl.value = data.url;
      // ElMessage.success(data.message);
      emit("update:successed", true);
      emit("update:imageUrl", data.url);
      // 调用 el-form 内部的校验方法（可自动校验）
      formItemContext?.prop &&
        formContext?.validateField([formItemContext.prop as string]);
      imageUrl.value = "";
    }
  } else {
    const raw = fileList.value[fileList.value.length - 1].raw!;
    imageUrl.value = URL.createObjectURL(raw);
    emit("update:imageUrl", imageUrl.value);
    // 调用 el-form 内部的校验方法（可自动校验）
    formItemContext?.prop &&
      formContext?.validateField([formItemContext.prop as string]);
  }
};

// 自定义文件上传请求方法
const httpRequest = async (options: UploadRequestOptions) => {
  console.log(options.file, "options@@@");
  const formData = new FormData();
  formData.append("filename", options.file.name);
  formData.append("itemId", props.uploadParam.id as string);
  formData.append("file", options.file);
  return await reqUploadAvatar(formData);
};

// 调用上传服务器方法
const uploadServer = () => {
  if (!imageUrl.value) {
    ElMessage.warning("请上传头像");
    return;
  }
  avatarRef.value!.submit();
};

// 删除头像功能
const delAvatar = () => {
  avatarRef.value!.clearFiles();
  imageUrl.value = "";
  emit("update:imageUrl", "");
};

// 预览头像功能
const imgViewVisible = ref(false);
const previewAvatar = () => {
  imgViewVisible.value = true;
};

// 编辑头像功能
const editImg = () => {
  const dom = document.querySelector(`#${uuid.value} .el-upload__input`);
  dom && dom.dispatchEvent(new MouseEvent("click"));
};

// 暴露出去外部组件可以调用的方法
defineExpose({
  uploadServer,
});
</script>

<style lang="scss">
.avatar-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-uploader {
    &.circle {
      .el-upload {
        border-radius: 50% !important;
      }

      .btn-item {
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &.disabled {
      &:hover {
        .el-upload {
          &:hover {
            border-color: var(--el-border-color);
          }
        }
      }

      .el-upload {
        background-color: #f3f3f3;
      }
    }

    &:hover {
      .upload-hover {
        visibility: visible;
      }

      .el-upload {
        &:hover {
          border-color: var(--el-color-primary);
        }
      }
    }

    .avatar {
      display: block;
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

      &:last-child {
        margin-right: 0;
      }

      .icon-style {
        margin-bottom: 10px;
        font-size: 20px;
      }
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      background-color: #fff;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }
  }
}
</style>
