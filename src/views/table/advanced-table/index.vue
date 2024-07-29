<template>
  <div class="table-box">
    <ProTable
      ref="proTableRef"
      :tableColumns="columns"
      :conditionList="conditionList"
      :tableData="tableData"
      :total="total"
      :updateTableList="updateTableList"
      :loading="loading"
      :selectionChange="selectionChange"
      rowKey="id"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
        :reserve-selection="true"
        fixed="left"
      ></el-table-column>
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button
          v-permission="['btn.advanced-table.add']"
          type="primary"
          :icon="CirclePlus"
          @click="openAddRoleDrawer"
          >新增学员</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.del']"
          type="danger"
          :icon="Remove"
          @click="deleteSelect"
          >删除学员</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.import']"
          :icon="Upload"
          @click="importTable"
          >导入数据</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.export']"
          :icon="Download"
          @click="exportTable"
          >导出数据</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="View"
          @click="viewInfo(slotData.scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          >编辑</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>
    <!-- 新增学员抽屉 -->
    <el-drawer
      v-model="addRoleDrawer"
      direction="rtl"
      :destroy-on-close="true"
      :title="addRoleForm.id ? '编辑学员' : '新增学员'"
      size="600px"
    >
      <div class="form-layout-wrapper">
        <el-form
          ref="addRoleFormRef"
          :model="addRoleForm"
          :rules="addRoleFormRules"
          label-width="auto"
          class="form-container"
        >
          <el-form-item label="姓名：" prop="username">
            <el-input
              v-model="addRoleForm.username"
              placeholder="请输入学员名称"
            />
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="addRoleForm.age" placeholder="请输入学员年龄" />
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input
              v-model="addRoleForm.address"
              placeholder="请输入地址信息"
            />
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="addRoleForm.sex" placeholder="请选择性别">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="个头大小：" prop="big">
            <el-select v-model="addRoleForm.big" placeholder="请选择个头大小">
              <el-option label="大" :value="1" />
              <el-option label="小" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="性格色彩：" prop="color">
            <el-input
              v-model="addRoleForm.color"
              placeholder="请输入16进制颜色值"
            />
          </el-form-item>
          <el-form-item label="兴趣爱好：" prop="hobby">
            <el-input
              v-model="addRoleForm.hobby"
              placeholder="请输入兴趣爱好"
            />
          </el-form-item>
          <el-form-item label="学校名称：" prop="school">
            <el-input
              v-model="addRoleForm.school"
              placeholder="请输入学校名称"
            />
          </el-form-item>
          <el-form-item label="档案时间：" prop="time">
            <el-date-picker
              v-model="addRoleForm.time"
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
              ref="userAvatarRef"
              :disabled="false"
              v-model:image-url="addRoleForm.avatarUrl"
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
          <el-button type="primary" @click="addRoleConfirm" :loading="uploading"
            >保存</el-button
          >
          <el-button @click="addRoleCancel">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 查看学员抽屉 -->
    <el-drawer v-model="detailDrawer" direction="rtl">
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
    <!-- 导入数据弹窗 -->
    <el-dialog
      v-model="importDialogVisible"
      title="导入数据"
      width="600"
      draggable
    >
      <div class="dialog-wrapper">
        <div class="step-item">
          <span class="label">第一步：</span>
          <span class="value">下载导入数据模版</span>
          <div class="block-wrapper">
            <el-button type="primary" link>下载模版</el-button>
          </div>
        </div>
        <div class="step-item">
          <span class="label">第二步：</span>
          <span class="value">上传录入数据的Excel文件</span>
          <div class="block-wrapper">
            <el-upload class="upload-demo" drag action="#" :auto-upload="false">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件直接上传 或者 <em>选择文件上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">文件大小不能超过500KB</div>
              </template>
            </el-upload>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="importDialogVisible = false">
            确认
          </el-button>
          <el-button @click="importDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="AdvancedTable">
import { onMounted, reactive, ref } from "vue";
import { PagainationType } from "@/types";
import AvatarUpload from "@/components/Upload/avatar.vue";
import { reqTableList, reqSaveTable, reqDelTable } from "@/api/user";
import ProTable from "@/components/ProTable/index.vue";
import useExport from "@/hooks/useExport";
import {
  CirclePlus,
  Delete,
  View,
  Remove,
  Upload,
  Download,
  EditPen,
  UploadFilled,
} from "@element-plus/icons-vue";
import {
  ElMessage,
  ElMessageBox,
  ElLoading,
  dayjs,
  FormInstance,
} from "element-plus";

const proTableRef = ref();
const loading = ref(false);
const uploading = ref(false);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "学员名称",
    prop: "username",
    placeholder: "请输入学员名称",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
  {
    id: 2,
    type: "select",
    label: "个头大小",
    prop: "big",
    placeholder: "请选择个头大小",
    optionList: [
      {
        label: "大",
        value: 1,
      },
      {
        label: "小",
        value: 0,
      },
    ],
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
  {
    id: 3,
    type: "select",
    label: "性别",
    prop: "sex",
    placeholder: "请选择性别",
    optionList: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 0,
      },
    ],
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
  {
    id: 4,
    type: "input",
    label: "地址",
    prop: "address",
    placeholder: "请输入地址",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
  {
    id: 5,
    type: "datetime",
    label: "档案时间",
    prop: "time",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
]);
// 表格配置项
const columns = reactive([
  {
    id: 10,
    prop: "avatarUrl",
    label: "学员头像",
    width: 100,
    isShowColumn: true,
    type: "image",
    fixed: "left",
  },
  {
    id: 1,
    prop: "username",
    label: "学员姓名",
    fixed: "left",
    width: 120,
    isShowColumn: true,
  },
  {
    id: 2,
    prop: "age",
    label: "年龄",
    sortable: true,
    width: 80,
    isShowColumn: true,
  },
  { id: 3, prop: "address", label: "地址", width: 200, isShowColumn: true },
  {
    id: 4,
    prop: "bigLabel",
    label: "个头大小",
    width: 100,
    isShowColumn: true,
  },
  {
    id: 5,
    prop: "color",
    label: "性格色彩",
    isShowColumn: true,
    width: 120,
    type: "color",
  },
  { id: 6, prop: "hobby", label: "兴趣", width: 200, isShowColumn: true },
  { id: 7, prop: "sexLabel", label: "性别", width: 60, isShowColumn: true },
  { id: 8, prop: "school", label: "学校", width: 200, isShowColumn: true },
  { id: 9, prop: "time", label: "档案时间", width: 160, isShowColumn: true },
  {
    id: 11,
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 220,
    isShowColumn: true,
    type: "slot",
  },
]);

type tableDataItem = {
  time: Date;
  username: string;
  age: number;
  address: string;
  big: string;
  color: string;
  hobby: string;
  sex: string;
  school: string;
  grade: string;
};
// 表格数据
let tableData = ref<tableDataItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: PagainationType) => {
  loading.value = true;
  const { code, data }: any = await reqTableList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item: tableDataItem) => ({
      ...item,
      bigLabel: item.big ? "大" : "小",
      sexLabel: item.sex ? "男" : "女",
      time: dayjs(item.time).format("YYYY-MM-DD HH:mm:ss"),
    }));
    total.value = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({ pageSize: 20, currentPage: 1 });
});

const addRoleDrawer = ref(false);
const openAddRoleDrawer = () => {
  addRoleForm.id && (addRoleForm.id = "");
  uploadParam.value.id && (uploadParam.value.id = "");
  !uploadSuccessed.value && (addRoleForm.avatarUrl = "");
  addRoleForm = reactive({});
  addRoleDrawer.value = true;
};

let addRoleForm = reactive<any>({});

const addRoleFormRef = ref<FormInstance>();

const addRoleFormRules = reactive({
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
const uploadSuccessed = ref(false);
const userAvatarRef = ref();

const addRoleConfirm = () => {
  addRoleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      uploading.value = true;
      console.log(addRoleForm, "@@@addRoleForm");
      const req = { ...addRoleForm };
      const { code, data }: any = await reqSaveTable(req);
      if (code === 200) {
        uploadParam.value.id = data.id;
        userAvatarRef.value!.uploadServer();
        addRoleFormRef.value && addRoleFormRef.value.resetFields();
        ElMessage.success("操作成功");
        updateTableList({ pageSize: 20, currentPage: 1 });
        addRoleDrawer.value = false;
        uploading.value = false;
      }
    } else {
      console.log("表单信息填写有误");
    }
  });
};

const selectRow = ref([]);
const selectionChange = (val: any) => {
  console.log(val, "val");
  selectRow.value = val;
};

const addRoleCancel = () => {
  addRoleDrawer.value = false;
};

const deleteRadio = (row: any) => {
  ElMessageBox.confirm("此操作将删除这条数据，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data }: any = await reqDelTable({
        ids: [row.id],
      });
      if (code === 200) {
        ElMessage({
          type: "success",
          message: data.message,
        });
        updateTableList({
          pageSize: 20,
          currentPage: 1,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const deleteSelect = () => {
  if (selectRow.value.length === 0) {
    ElMessage.warning("请选择要删除的数据");
    return;
  }
  ElMessageBox.confirm("此操作将删除选择的数据，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data }: any = await reqDelTable({
        ids: selectRow.value.map((item: any) => item.id),
      });
      if (code === 200) {
        ElMessage({
          type: "success",
          message: data.message,
        });
        updateTableList({
          pageSize: 20,
          currentPage: 1,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const detailInfo = ref<any>({});
const detailDrawer = ref(false);
const viewInfo = (row: any) => {
  detailDrawer.value = true;
  detailInfo.value = row;
};

const modifiyInfo = (row: any) => {
  addRoleForm = { ...row };
  addRoleDrawer.value = true;
};

const importDialogVisible = ref(false);
const importTable = () => {
  importDialogVisible.value = true;
};

const exportTable = () => {
  if (selectRow.value.length === 0) {
    ElMessage.warning("请选择要导出的数据");
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: `正在导出数据`,
    background: "rgba(0, 0, 0, 0.8)",
  });
  const list = JSON.stringify(selectRow.value);
  const data = JSON.parse(list);
  const config = columns.map((item) => {
    return {
      title: item.label,
      dataIndex: item.prop,
    };
  });
  useExport(config, data, "学员列表", (progress: number) => {
    if (progress === 100) {
      setTimeout(() => {
        loading.close();
        ElMessage({
          type: "success",
          message: "数据导出成功",
        });
        proTableRef.value!.clearSelection();
      }, 2000);
    }
  });
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}

.form-layout-wrapper {
  .form-container {
    .form-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 20px;

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

.dialog-wrapper {
  padding: 16px 10px;
  margin: 0 auto;

  .step-item {
    min-height: 60px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 15px;
      font-weight: 700;
    }

    .block-wrapper {
      margin-top: 16px;
    }
  }
}
</style>
