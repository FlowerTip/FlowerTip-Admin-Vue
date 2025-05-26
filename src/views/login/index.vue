<template>
  <div class="login-container">
    <el-row class="row-container" justify="center">
      <el-col :span="14" :xs="0">
        <div class="left-logo">
          <el-carousel motion-blur height="400px">
            <el-carousel-item>
              <div class="carousel-img first"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel-img two"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel-img three"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel-img last"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="10" :xs="22">
        <div class="right-form">
          <h3 class="login-logo">{{ defaultSetting.title }}</h3>
          <el-form
            :model="loginFormData"
            :rules="loginFormRules"
            class="login-form"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginFormData.username"
                :prefix-icon="User"
                :placeholder="$t('loginText.username')"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                show-password
                v-model="loginFormData.password"
                :prefix-icon="Lock"
                :placeholder="$t('loginText.password')"
              />
            </el-form-item>
            <el-form-item prop="code">
              <div class="code-wrapper">
                <el-input
                  v-model="loginFormData.code"
                  :prefix-icon="Picture"
                  :placeholder="$t('loginText.msg')"
                />
                <VerifyCode :updateImgCode="updateImgCode"></VerifyCode>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                :loading="loginLoading"
                @click="handleLogin"
                >{{ $t("loginText.login") }}</el-button
              >
            </el-form-item>
            <el-form-item class="tip">
              <h4>{{ $t("loginText.tips.h1") }}：</h4>
              <p>1.{{ $t("loginText.tips.p1") }}</p>
              <p>2.{{ $t("loginText.tips.p2") }}</p>
              <p>3.{{ $t("loginText.tips.p3") }}</p>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock, Picture } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import VerifyCode from "@/components/VerifyCode/index.vue";
import defaultSetting from "@/setting";
import useUserStore from "@/store/modules/userStore";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";
const userStore = useUserStore();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const loginFormData = reactive({
  username: "系统管理员",
  password: "123456",
  code: "",
});
const loginFormRules = reactive({
  username: [
    { required: true, message: t("loginText.username"), trigger: "blur" },
    { min: 2, max: 6, message: "长度只能输入2到6位", trigger: "blur" },
  ],
  password: [
    { required: true, message: t("loginText.password"), trigger: "blur" },
    { min: 6, max: 8, message: "长度只能输入6到8位", trigger: "blur" },
  ],
  code: [
    { required: true, message: t("loginText.msg"), trigger: "blur" },
    { min: 4, max: 4, message: "图形验证码错误", trigger: "blur" },
  ],
});

const updateImgCode = (imgCode: string) => {
  loginFormData.code = imgCode;
};

const loginLoading = ref(false);

const handleLogin = async () => {
  const { redirect } = route.query;
  loginLoading.value = true;
  const res = await userStore.login(loginFormData);
  if (res && res.token) {
    loginLoading.value = false;
    const redirectUrl = (redirect || "/") as string;
    router.replace(redirectUrl);
  } else {
    ElNotification({
      title: "登录提示",
      message: "账号或密码错误",
      type: "warning",
    });
    loginLoading.value = false;
  }
};
</script>

<style lang="scss">
.login-container {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/images/bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .row-container {
    width: 1000px;
    height: 400px;

    .left-logo {
      .carousel-img {
        width: 100%;
        height: 400px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;

        &.first {
          background-image: url(../../assets/login/wendang.png);
        }

        &.two {
          background-image: url(../../assets/login/kehu.png);
        }

        &.three {
          background-image: url(../../assets/login/wenjian.png);
        }

        &.last {
          background-image: url(../../assets/login/lianjie.png);
        }
      }
    }

    .right-form {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 16px 0 16px;
      background-color: rgba(0, 0, 0, 0.3);

      .login-logo {
        width: 100%;
        font-family: HYGangYiTi-HEW;
        font-weight: 700;
        font-size: 30px;
        color: #ffffff;
        letter-spacing: 0.5px;
        text-align: center;
        margin-bottom: 18px;

        img {
          width: 100%;
        }
      }

      .login-form {
        width: 100%;

        .login-btn {
          width: 100%;
        }

        .el-form-item {
          margin-bottom: 18px;
        }

        .tip {
          width: 100%;

          h4 {
            font-weight: 600;
            font-size: 18px;
            color: #fff;
          }

          p {
            width: 100%;
            color: #fff;
            line-height: 28px;
          }
        }
      }
    }
  }

  .code-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .theme-wrapper {
    position: absolute;
    right: 50px;
    top: 50px;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;

    .switch-name {
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
