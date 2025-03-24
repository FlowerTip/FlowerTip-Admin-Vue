<template>
  <div class="header-right-info">
    <!-- 当前时间 -->
    <div v-if="settingStore.showHeaderBar" class="current-time">
      <span class="ymd">{{ ymd }}</span>
      <span class="hms">{{ hms }}</span>
    </div>
    <!-- 消息通知 -->
    <div class="message-box">
      <el-popover
        :width="300"
        trigger="click"
        popper-class="popover-box"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px;"
      >
        <template #reference>
          <el-icon class="msg-icon">
            <el-badge
              :value="200"
              :max="99"
              is-dot
              :offset="[-5, 0]"
              class="item"
              :color="settingStore.color"
            >
              <Bell />
            </el-badge>
          </el-icon>
        </template>
        <template #default>
          <div class="message-box-wrapper">
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane label="通知消息" name="first">
                <div class="message-item" v-for="i in 20" :key="i">
                  <div class="left-icon">
                    <el-icon class="icon-style">
                      <ChatLineRound />
                    </el-icon>
                  </div>
                  <div class="right-box">
                    <span class="content">一键三连GuiGu-Admin-Template</span>
                    <span class="time">2024-06-04 09:38</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="报警消息" name="second">
                <div class="message-item" v-for="i in 20" :key="i">
                  <div class="left-icon">
                    <el-icon class="icon-style">
                      <BellFilled />
                    </el-icon>
                  </div>
                  <div class="right-box">
                    <span class="content">一键三连GuiGu-Admin-Template</span>
                    <span class="time">2024-06-04 09:38</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待办消息" name="third">
                <div class="message-item" v-for="i in 20" :key="i">
                  <div class="left-icon">
                    <el-icon class="icon-style">
                      <Message />
                    </el-icon>
                  </div>
                  <div class="right-box">
                    <span class="content">一键三连GuiGu-Admin-Template</span>
                    <span class="time">2024-06-04 09:38</span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </template>
      </el-popover>
    </div>
    <!-- 全屏按钮 -->
    <div class="screen-box" @click="toggleFullScreen">
      <svg
        v-if="!isFullScreen"
        t="1717408008762"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9338"
        id="mx_n_1717408008762"
        width="400"
        height="400"
      >
        <path
          d="M285.866667 810.666667H384v42.666666H213.333333v-170.666666h42.666667v98.133333l128-128 29.866667 29.866667-128 128z m494.933333 0l-128-128 29.866667-29.866667 128 128V682.666667h42.666666v170.666666h-170.666666v-42.666666h98.133333zM285.866667 256l128 128-29.866667 29.866667-128-128V384H213.333333V213.333333h170.666667v42.666667H285.866667z m494.933333 0H682.666667V213.333333h170.666666v170.666667h-42.666666V285.866667l-128 128-29.866667-29.866667 128-128z"
          :fill="settingStore.layout !== 'simplebar' ? '#ffffff' : '#606266'"
          p-id="9339"
        ></path>
      </svg>
      <svg
        v-else
        t="1717408038796"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9805"
        width="400"
        height="400"
      >
        <path
          d="M354.133333 682.666667H256v-42.666667h170.666667v170.666667H384v-98.133334L243.2 853.333333l-29.866667-29.866666L354.133333 682.666667z m358.4 0l140.8 140.8-29.866666 29.866666-140.8-140.8V810.666667h-42.666667v-170.666667h170.666667v42.666667h-98.133334zM354.133333 384L213.333333 243.2l29.866667-29.866667L384 354.133333V256h42.666667v170.666667H256V384h98.133333z m358.4 0H810.666667v42.666667h-170.666667V256h42.666667v98.133333L823.466667 213.333333l29.866666 29.866667L712.533333 384z"
          :fill="settingStore.layout !== 'simplebar' ? '#ffffff' : '#606266'"
          p-id="9806"
        ></path>
      </svg>
    </div>
    <!-- 个人信息 -->
    <div class="user-info">
      <el-dropdown placement="bottom-end" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user"
              ><el-icon>
                <Avatar /> </el-icon
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item command="setting"
              ><el-icon>
                <ChromeFilled /> </el-icon
              >偏好设置</el-dropdown-item
            >
            <el-dropdown-item command="logout" divided
              ><el-icon>
                <SwitchButton /> </el-icon
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div v-if="defaultSetting.showSetting" @click="openRightSetting">
    <FloatButton
      ref="btnRef"
      type="primary"
      shape="square"
      :style="{
        right: '0px',
        bottom: '430px',
      }"
    >
      <template #icon>
        <SlackOutlined />
      </template>
    </FloatButton>
  </div>
  <!-- 偏好设置抽屉 -->
  <el-drawer
    append-to-body
    modal-class="drawer-wrapper"
    v-model="drawer"
    title="偏好设置"
    direction="rtl"
    :size="290"
  >
    <div class="drawer-box">
      <div class="divider-item">
        <el-divider>
          <div class="title">
            <el-icon class="icon-style">
              <Box />
            </el-icon>
            <span class="title-txt">布局设置</span>
          </div>
        </el-divider>
        <div class="wrapper">
          <div class="nav-group">
            <div class="nav-layout">
              <!-- 第一种 经典导航 -->
              <div
                class="nav-style-item"
                :class="[settingStore.layout == 'simplebar' ? 'is-active' : '']"
                @click.stop="toggleLayout('simplebar')"
              >
                <div class="left-box"></div>
                <div class="right-box">
                  <div class="bot-box-wrap"></div>
                </div>
              </div>
              <div class="layout-title">经典导航</div>
            </div>
            <div class="nav-layout">
              <!-- 第二种 左侧导航 -->
              <div
                class="nav-style-item"
                :class="[settingStore.layout == 'sidebar' ? 'is-active' : '']"
                @click.stop="toggleLayout('sidebar')"
              >
                <div class="left-box"></div>
                <div class="right-box">
                  <div class="top-box-wrap"></div>
                  <div class="bot-box-wrap"></div>
                </div>
              </div>
              <div class="layout-title">简约导航</div>
            </div>
          </div>
          <div class="nav-group">
            <div class="nav-layout">
              <!-- 第三种 顶部导航 -->
              <div
                class="nav-style-item"
                :class="[settingStore.layout == 'topbar' ? 'is-active' : '']"
                @click.stop="toggleLayout('topbar')"
              >
                <div class="top-box"></div>
                <div class="bot-box"></div>
              </div>
              <div class="layout-title">大屏导航</div>
            </div>
            <div class="nav-layout">
              <!-- 第四种 混合导航 -->
              <div
                class="nav-style-item style3"
                :class="[settingStore.layout == 'mixbar' ? 'is-active' : '']"
                @click.stop="toggleLayout('mixbar')"
              >
                <div class="top-box"></div>
                <div class="bot-box">
                  <div class="right-box-wrap"></div>
                  <div class="left-box-wrap"></div>
                </div>
              </div>
              <div class="layout-title">混合导航</div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider-item">
        <el-divider>
          <div class="title">
            <el-icon class="icon-style">
              <ChromeFilled />
            </el-icon>
            <span class="title-txt">搭配设置</span>
          </div>
        </el-divider>
        <div class="wrapper">
          <div class="color-layout-wrapper">
            <h4
              :class="{ 'active-bg': currentTheme == 'classicThemeColors' }"
              @click="changeThemeColor('classicThemeColors')"
            >
              经典主题
            </h4>
            <div class="color-layout">
              <div
                class="color-item"
                v-for="(color, index) in themeColorName.classicThemeColors"
                :key="index"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
          <div class="color-layout-wrapper">
            <h4
              :class="{ 'active-bg': currentTheme == 'fashionThemeColors' }"
              @click="changeThemeColor('fashionThemeColors')"
            >
              时尚主题
            </h4>
            <div class="color-layout">
              <div
                class="color-item"
                v-for="(color, index) in themeColorName.fashionThemeColors"
                :key="index"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
          <div class="color-layout-wrapper">
            <h4
              :class="{ 'active-bg': currentTheme == 'freshThemeColors' }"
              @click="changeThemeColor('freshThemeColors')"
            >
              清新主题
            </h4>
            <div class="color-layout">
              <div
                class="color-item"
                v-for="(color, index) in themeColorName.freshThemeColors"
                :key="index"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
          <div class="color-layout-wrapper">
            <h4
              :class="{ 'active-bg': currentTheme == 'coolThemeColors' }"
              @click="changeThemeColor('coolThemeColors')"
            >
              热情主题
            </h4>
            <div class="color-layout">
              <div
                class="color-item"
                v-for="(color, index) in themeColorName.coolThemeColors"
                :key="index"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
          <div class="current-layout">
            <div class="color-value">
              当前风格：<span :style="{ color: currentColor }">{{
                currentThemeName
              }}</span>
              主题颜色：
            </div>
            <div
              class="color-item"
              :style="{ backgroundColor: currentColor }"
            ></div>
          </div>
        </div>
      </div>
      <div class="divider-item">
        <el-divider>
          <div class="title">
            <el-icon class="icon-style">
              <Setting />
            </el-icon>
            <span class="title-txt">界面设置</span>
          </div>
        </el-divider>
        <div class="wrapper">
          <div class="item">
            <span class="right-txt">顶部区域</span>
            <el-switch
              v-model="settingStore.showHeaderBar"
              :disabled="settingStore.layout === 'simplebar'"
              @change="toggleHeaderBar"
            />
          </div>
          <div class="item">
            <span class="right-txt">系统名称</span>
            <el-switch
              v-model="settingStore.showHeaderLogo"
              :disabled="
                settingStore.showHeaderBar ||
                settingStore.layout === 'simplebar'
              "
            />
          </div>
          <div class="item">
            <span class="right-txt">顶部收缩菜单</span>
            <el-switch
              v-model="settingStore.topShowCollapsed"
              :disabled="settingStore.layout !== 'mixbar'"
            />
          </div>
          <div class="item">
            <span class="right-txt">面包屑</span>
            <el-switch
              v-model="settingStore.showBreadcrumb"
              dataset-key="showBreadcrumb"
              :disabled="!settingStore.showHeaderBar"
            />
          </div>
          <div class="item">
            <span class="right-txt">标签栏</span>
            <el-switch v-model="settingStore.showTagsView" />
          </div>
          <div class="item">
            <span class="right-txt">页脚</span>
            <el-switch v-model="settingStore.showFooterBar" />
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
  <!-- 个人中心抽屉 -->
  <el-drawer
    append-to-body
    modal-class="drawer-wrapper"
    v-model="userDrawer"
    title="个人中心"
    direction="rtl"
    :size="290"
  >
    <div class="drawer-box">
      <div class="wrapper">
        <p class="user-item">
          <span class="label">用户昵称：</span>
          <span class="value">{{ userStore.username }}</span>
        </p>
        <p class="user-item">
          <span class="label">权限角色：</span>
          <span class="value">{{ userStore.roleNames }}</span>
        </p>
        <p class="user-item">
          <span class="label">所在岗位：</span>
          <span class="value">{{ userStore.workPostName }}</span>
        </p>
        <p class="user-item">
          <span class="label">所属部门：</span>
          <span class="value">{{ userStore.departmentName }}</span>
        </p>
      </div>
    </div>
  </el-drawer>
  <!-- AI助手抽屉 -->
  <el-drawer
    :show-close="false"
    append-to-body
    modal-class="drawer-wrapper"
    v-model="aiDrawer"
    title="FlowerTip Admin 智能对话交互助手"
    direction="rtl"
    :size="600"
  >
    <ChatAi />
  </el-drawer>
  <!-- 漫游式导航 -->
  <el-tour v-model="tourOpen" @finish="handlerFinish">
    <el-tour-step
      title="如何使用您的AI专属助手"
      description="我们可以使用AI助手进行对话"
    >
      <img style="width: 100%" src="@/assets/images/ai.png" alt="tour.png" />
    </el-tour-step>
    <el-tour-step
      title="使用AI助手"
      description="点击右侧AI按钮，即可开启AI助手"
      placement="right"
      :target="btnRef?.$el"
    />
  </el-tour>
</template>

<script lang="ts" setup>
import screenfull from "screenfull";
import { ref, computed, onBeforeUnmount, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ElMessage,
  ElMessageBox,
  TabsPaneContext,
  type ButtonInstance,
} from "element-plus";
import { SlackOutlined } from "@ant-design/icons-vue";
import { FloatButton } from "ant-design-vue";
import {
  ArrowDown,
  Bell,
  ChatLineRound,
  BellFilled,
  Message,
  Setting,
  Box,
  ChromeFilled,
  Avatar,
  SwitchButton,
} from "@element-plus/icons-vue";
import ChatAi from "./chat.vue";
import useUserStore from "@/store/modules/userStore";
import useSettingStore from "@/store/modules/settingStore";
import useTagsViewStore from "@/store/modules/tagsViewStore";
import { useRefreshTime } from "@/hooks/useRefreshTime";
import useThemeColor from "@/hooks/useThemeColor";
import defaultSetting from "@/setting";
const settingStore = useSettingStore();
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();

const { currentTime, clearTimer } = useRefreshTime();

const $route = useRoute();
const router = useRouter();

onBeforeUnmount(() => {
  clearTimer();
});

const tourOpen = ref(false);
const btnRef = ref<ButtonInstance>();

const handlerFinish = () => {
  aiDrawer.value = true;
};

const drawer = ref(false);
let userDrawer = ref(false);
const aiDrawer = ref(false);

const {
  themeColorName,
  toggleThemeColor,
  currentTheme,
  currentColor,
  currentThemeName,
} = useThemeColor();

const changeThemeColor = (colorThemeName: string, showTip = true) => {
  toggleThemeColor(colorThemeName);
  drawer.value = false;
  if (showTip) {
    ElMessage({
      type: "success",
      message: `主题设置成功`,
    });
  }
};

const openRightSetting = () => {
  aiDrawer.value = true;
};

const handleCommand = (command: string) => {
  if (command === "logout") {
    ElMessageBox.confirm("确认要退出登录. 是否继续?", "退出登录", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        settingStore.updateSetting(defaultSetting);
        changeThemeColor(defaultSetting.themeName, false);
        tagsViewStore.tabsMenuList.forEach((item) => {
          tagsViewStore.removeTab(item.path);
        });
        await userStore.logout();
        router.replace({
          path: "/login",
          query: { redirect: $route.path },
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消操作",
        });
      });
  } else if (command === "setting") {
    drawer.value = true;
  } else {
    userDrawer.value = true;
  }
};

const ymd = computed(() => {
  const splitTime = currentTime.value.split(" ");
  return Array.isArray(splitTime) && splitTime[0];
});

const hms = computed(() => {
  const splitTime = currentTime.value.split(" ");
  return Array.isArray(splitTime) && splitTime[1];
});

let isFullScreen = ref(screenfull.isFullscreen);

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const toggleLayout = (layout: string) => {
  settingStore.updateSetting({
    layout,
    showHeaderBar: layout === "simplebar" ? false : true,
    topShowCollapsed:
      layout === "mixbar" ? settingStore.topShowCollapsed : false,
  });
  drawer.value = false;
  ElMessage({
    type: "success",
    message: `主题设置成功`,
  });
};

onMounted(() => {
  if (defaultSetting.layout === "simplebar") {
    settingStore.updateSetting({
      showHeaderBar: false,
      topShowCollapsed:
        settingStore.layout === "mixbar"
          ? settingStore.topShowCollapsed
          : false,
    });
  }
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) isFullScreen.value = true;
    else isFullScreen.value = false;
  });
  tourOpen.value = true;
});
const toggleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};

const toggleHeaderBar = (val: string | number | boolean) => {
  if (!val) {
    toggleLayout("simplebar");
  } else {
    toggleLayout("mixbar");
  }
};
</script>

<style lang="scss" scoped>
.header-right-info {
  width: 282px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .user-info {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .el-dropdown-link {
      height: 40px;
      line-height: 40px;
      color: #fff;
    }
  }

  .current-time {
    margin-right: 10px;
    display: flex;
    flex-direction: column;

    span {
      width: 80px;
      font-size: 14px;
      color: #eaf0ff;
      line-height: 18px;
    }
  }

  .screen-box {
    width: 42px;
    color: #fff;
    height: 100%;

    svg {
      width: 30px;
      height: 49px;
      cursor: pointer;
      color: #fff;
    }
  }

  .message-box {
    padding-top: 14px;
    cursor: pointer;
    margin-right: 2px;

    .msg-icon {
      font-size: 24px;
      color: #fff;
    }
  }
}

.user-item {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;

  .label {
    width: 80px;
    color: #656565;
  }

  .value {
    flex: 1;
  }
}

.popover-box {
  .message-item {
    display: flex;
    align-items: center;
    padding: 6px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--el-border-color);
    cursor: pointer;

    .left-icon {
      flex: 1;

      .icon-style {
        font-size: 28px;
      }
    }

    .right-box {
      flex: 9;
      display: flex;
      flex-direction: column;
      align-items: center;

      .content {
        margin-bottom: 4px;
      }
    }
  }

  .el-tab-pane {
    max-height: 260px;
    overflow-y: auto;
  }
}

.drawer-box {
  .title {
    display: flex;
    align-items: center;

    icon-style {
      font-size: 26px;
    }

    .title-txt {
      padding-left: 4px;
    }
  }

  .wrapper {
    min-height: 120px;

    .project-layout {
      margin-bottom: 20px;
      font-size: 14px;
    }

    .author-layout {
      font-size: 14px;
      color: #303133;
      padding-bottom: 20px;

      h1 {
        font-size: 18px;
        font-weight: 700;
        line-height: 40px;
        text-align: center;
      }

      h2 {
        font-size: 16px;
        line-height: 40px;
      }

      h3 {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 20px;
      }
    }

    .color-layout-wrapper {
      margin-bottom: 20px;

      &:nth-child(4) {
        margin-bottom: 0;
      }

      h4 {
        width: 100px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        background-color: #f3f3f3;
        margin: 0 auto;
        cursor: pointer;
        border-radius: 4px;
        color: #656565;

        &.active-bg {
          background-color: var(--el-color-primary);
          color: #fff;
        }
      }
    }

    .color-layout {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;

      .color-item {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        border-radius: 4px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .current-layout {
      padding-top: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;

      .color-value {
        padding-right: 10px;
      }

      .color-item {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 4px;
      }
    }

    .item {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .layout-title {
      font-size: 14px;
      color: #303133;
      padding-top: 20px;
      text-align: center;
    }

    .nav-group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      padding-top: 20px;
    }

    .nav-layout {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .nav-style-item {
      width: 45%;
      height: 36px;
      overflow: hidden;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 0px 2.5px 0 rgba(0, 0, 0, 0.18);
      cursor: pointer;
      display: flex;

      &.style3 {
        flex-direction: column;
      }

      &.is-active {
        position: relative;

        &::before {
          content: "∨";
          position: absolute;
          right: 10px;
          bottom: 4px;
          width: 22px;
          height: 22px;
          font-size: 22px;
          color: var(--el-color-primary);
        }
      }

      .left-box {
        width: 33.3333%;
        background-color: #000;
      }

      .right-box {
        flex: 1;

        .top-box-wrap {
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      .top-box {
        width: 100%;
        height: 25%;
        background-color: #000;
      }

      .bot-box {
        flex: 1;
        width: 100%;
        display: flex;

        .left-box-wrap {
          width: 33.33%;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
