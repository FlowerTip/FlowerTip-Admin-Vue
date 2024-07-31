<template>
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :destroy-on-close="true"
    :title="title"
    size="600px"
  >
    <div class="form-layout-wrapper">
      <el-form
        ref="dialogFormRef"
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="auto"
        class="form-container"
      >
        <el-form-item label="姓名：" prop="username">
          <el-input
            v-model="dialogForm.username"
            placeholder="请输入学员名称"
          />
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model="dialogForm.age" placeholder="请输入学员年龄" />
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="dialogForm.address" placeholder="请输入地址信息" />
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="dialogForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="个头大小：" prop="big">
          <el-select v-model="dialogForm.big" placeholder="请选择个头大小">
            <el-option label="大" :value="1" />
            <el-option label="小" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="性格色彩：" prop="color">
          <el-input
            v-model="dialogForm.color"
            placeholder="请输入16进制颜色值"
          />
        </el-form-item>
        <el-form-item label="兴趣爱好：" prop="hobby">
          <el-input v-model="dialogForm.hobby" placeholder="请输入兴趣爱好" />
        </el-form-item>
        <el-form-item label="学校名称：" prop="school">
          <el-input v-model="dialogForm.school" placeholder="请输入学校名称" />
        </el-form-item>
        <el-form-item label="档案时间：" prop="time">
          <el-date-picker
            v-model="dialogForm.time"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择入档时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item prop="avatarUrl" label="学员头像：">
          <AvatarUpload
            width="80"
            height="80"
            type="round"
            ref="UserAvatarRef"
            :disabled="false"
            v-model:image-url="dialogForm.avatarUrl"
            v-model:successed="uploadSuccessed"
            :uploadParam="uploadParam"
          >
            <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
          </AvatarUpload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="drawerConfirm" :loading="loading"
          >保存</el-button
        >
        <el-button @click="drawerCancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import AvatarUpload from "@/components/Upload/avatar.vue";

const dialogForm = ref({
  username: "",
  age: "",
  address: "",
  sex: "",
  big: "",
  color: "",
  hobby: "",
  school: "",
  time: "",
  avatarUrl: "",
});

const dialogFormRules = reactive({
  username: [
    {
      required: true,
      message: "姓名不能为空",
      trigger: "blur",
    },
  ],
  age: [
    {
      required: true,
      message: "年龄不能为空",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: "地址信息不能为空",
      trigger: "blur",
    },
  ],
  big: [
    {
      required: true,
      message: "请选择个头大小",
      trigger: "change",
    },
  ],
  color: [
    {
      required: true,
      message: "输入颜色值",
      trigger: "blur",
    },
  ],
  hobby: [
    {
      required: true,
      message: "兴趣爱好不能为空",
      trigger: "blur",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change",
    },
  ],
  school: [
    {
      required: true,
      message: "学校信息不能为空",
      trigger: "blur",
    },
  ],
  time: [
    {
      required: true,
      message: "请选择入档时间",
      trigger: "change",
    },
  ],
  avatarUrl: [
    {
      required: true,
      message: "请上传头像",
      trigger: "change",
    },
  ],
});

const uploadParam = ref({
  id: "",
});

// 图片上传成功，处理后续逻辑
const uploadSuccessed = ref(false);

watch(
  () => uploadSuccessed.value,
  (newVal) => {
    if (newVal) {
      ElMessage.success({ message: `${title.value}成功` });
      dialogProps.value.getTableList!({
        currentPage: 1,
        pageSize: 20,
      });
      drawerVisible.value = false;
      loading.value = false;
      // 重置表单
      resetForm(dialogFormRef.value);
    }
  }
);

const drawerVisible = ref(false);
const loading = ref(false);

const title = ref("");
const dialogFormRef = ref();
const UserAvatarRef = ref();
const drawerConfirm = async () => {
  dialogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const req = {
        ...dialogForm.value,
      };
      try {
        loading.value = true;
        const { code, data }: any = await dialogProps.value.api!(req);
        if (code === 200) {
          uploadParam.value.id = data.id;
          UserAvatarRef.value!.uploadServer();
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    } else {
      ElMessage.warning("表单信息填写有误");
    }
  });
};

const drawerCancel = () => {
  drawerVisible.value = false;
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const dialogProps = ref<any>();

// 接收父组件参数
const acceptParams = (params: any): void => {
  dialogProps.value = params;
  dialogForm.value = params.dialogForm;
  title.value = params.dialogForm.id ? "编辑学员" : "新增学员";
  drawerVisible.value = true;
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped></style>
