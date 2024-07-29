<!-- <template>
  <el-drawer v-model="addRoleDrawer" direction="rtl" :destroy-on-close="true"
      :title="addRoleForm.id ? '编辑用户' : '新增用户'" size="600px">
      <div class="form-layout-wrapper">
        <el-form ref="addRoleFormRef" :model="addRoleForm" :rules="addRoleFormRules" label-width="auto"
          class="form-container">
          <el-form-item label="姓名：" prop="username">
            <el-input v-model="addRoleForm.username" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="addRoleForm.age" placeholder="请输入用户年龄" />
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="addRoleForm.address" placeholder="请输入地址信息" />
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
            <el-input v-model="addRoleForm.color" placeholder="请输入16进制颜色值" />
          </el-form-item>
          <el-form-item label="兴趣爱好：" prop="hobby">
            <el-input v-model="addRoleForm.hobby" placeholder="请输入兴趣爱好" />
          </el-form-item>
          <el-form-item label="学校名称：" prop="school">
            <el-input v-model="addRoleForm.school" placeholder="请输入学校名称" />
          </el-form-item>
          <el-form-item label="档案时间：" prop="time">
            <el-date-picker v-model="addRoleForm.time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择入档时间" style="width: 100%" />
          </el-form-item>
          <el-form-item prop="avatarUrl" label="用户头像：">
            <AvatarUpload width="80" height="80" type="round" ref="userAvatarRef" :disabled="false"
              v-model:image-url="addRoleForm.avatarUrl" v-model:successed="uploadSuccessed" :uploadParam="uploadParam">
              <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
            </AvatarUpload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="addRoleConfirm" :loading="uploading">保存</el-button>
          <el-button @click="addRoleCancel">取消</el-button>
        </div>
      </template>
  </el-drawer>
</template> -->
