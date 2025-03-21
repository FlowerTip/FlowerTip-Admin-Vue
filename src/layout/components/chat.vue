<template>
  <div class="chat_layout">
    <div
      class="chat"
      style="
        white-space: pre-line;
        height: calc(100vh - 110px);
        overflow-y: auto;
      "
    >
      <Bubble.List :items="fItems" :roles="roles" />
      <!-- 清空对话按钮 -->
      <Flex
        :gap="12"
        align="start"
        :vertical="false"
        style="width: 100%; padding-bottom: 10px"
      >
        <Button
          type="primary"
          ghost
          :icon="h(SendOutlined)"
          @click="handlerClearSubmit"
        >
          清空输入
        </Button>
        <Button danger :icon="h(ClearOutlined)" @click="handlerClearSession">
          清空对话
        </Button>
      </Flex>
      <!-- 输入框 -->
      <Sender
        :value="content"
        :onSubmit="onSubmit"
        :onChange="setContent"
        :prefix="attachmentsNode"
        :loading="agent.isRequesting()"
      >
        <template #header>
          <Sender.Header
            title="图片上传"
            :open="headerOpen"
            @open-change="setHeaderOpen"
          >
            <Attachments
              ref="attachmentsRef"
              :items="attachedFiles"
              :beforeUpload="() => false"
              :onChange="handleFileChange"
              :placeholder="placeholderFn"
            />
          </Sender.Header>
        </template>
      </Sender>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  // 消息气泡
  Bubble,
  // 发送框
  Sender,
  Welcome,
  Prompts,
  Attachments,
  useXAgent,
  useXChat,
  XRequest,
  type PromptsProps,
  type BubbleListProps,
  SSEFields,
} from "ant-design-x-vue";
import { ref, h, computed } from "vue";
import {
  UserOutlined,
  ProfileOutlined,
  NotificationOutlined,
  SendOutlined,
  ClearOutlined,
  PaperClipOutlined,
  CloudUploadOutlined,
  SyncOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import { Button, Flex, Space, Spin, Badge, Image } from "ant-design-vue";
import useUserStore from "@/store/modules/userStore";
import { ElMessage } from "element-plus";
import markdownit from "markdown-it";
import { isIndexOfFiles, isMdelement } from "@/utils/tool";
import { Attachment } from "ant-design-x-vue/dist/typings/attachments/interface";

defineOptions({ name: "SampleChat" });

const md = markdownit({ html: true, breaks: true });

const renderMarkdown = (content: any) =>
  isMdelement(content) ? h("p", { "v-html": md.render(content) }) : content;

// https://api.siliconflow.cn/v1/chat/completions
// https://api.chatanywhere.tech/v1/chat/completions
const aiConfig = {
  BASE_URL: " https://api.siliconflow.cn",
  PATH: "/v1/chat/completions",
  MODEL: "Qwen/QVQ-72B-Preview",
  // MODEL: 'gpt-3.5-turbo',
  // MODEL: 'Qwen/QwQ-32B',
  API_KEY: "Bearer sk-egddhgwyygueidskftjyqltrcezjhwdjpfzbdndojvrmitaa",
  // API_KEY: "sk-XKL1YHDdy9VHWZeDdiXNbswkHumM2fllSe7JH5ZR3v8oL8El"
};
const exampleRequest = XRequest({
  baseURL: aiConfig.BASE_URL + aiConfig.PATH,
  model: aiConfig.MODEL,

  /** 🔥🔥 Its dangerously! */
  dangerouslyApiKey: aiConfig.API_KEY,
});
const attachedFiles = ref([]);

const [agent] = useXAgent({
  request: async ({ message }, { onSuccess, onUpdate }) => {
    const params: {
      role: string;
      content:
        | Attachment[]
        | { type: string; text: string | undefined | any }[];
    } = {
      role: "user",
      content: [],
    };
    console.log(
      isIndexOfFiles(message as string),
      message,
      messages,
      items,
      "ceshi"
    );
    if (isIndexOfFiles(message as string)) {
      const jsContentObj = JSON.parse(message as string);
      console.log(jsContentObj, "参数附件");
      const { content, files, oldMsgList } = jsContentObj;
      const questionList = oldMsgList.filter(
        (item: any) => item && typeof item.content == "string"
      );
      const textParam = [{ type: "text", text: content }];
      if (files.length > 0) {
        const paramFiles = files.map((item: { name: string; url: string }) => {
          return {
            type: "image_url",
            image_url: {
              url: item.url,
            },
          };
        });
        params.content = [
          ...questionList.map((item: { content: any }) => {
            return {
              type: "text",
              text: item.content,
            };
          }),
          ...paramFiles,
          ...textParam,
        ];
      } else {
        if (oldMsgList.length > 0) {
          params.content = [
            ...questionList.map((item: { content: any }) => {
              return {
                type: "text",
                text: item.content,
              };
            }),
            ...textParam,
          ];
        } else {
          params.content = textParam;
        }
      }
    } else {
      params.content = [{ type: "text", text: message }];
    }
    /**
     * 模拟请求延迟
     */
    setTimeout(() => {
      onUpdate("loading");
    }, 500);

    await exampleRequest.create(
      {
        messages: [params],
        // response_format: {"type": "json_object"}
      },
      {
        onSuccess: function (chunks: any): void {
          const fullContent = chunks[0].choices[0].message.content;
          onSuccess(fullContent);
        },
        onError: function (error: Error): void {
          console.log(error);
        },
        onUpdate: function (chunk: Partial<Record<SSEFields, any>>): void {
          console.log(chunk);
        },
      }
    );
  },
});

const { onRequest, messages, setMessages } = useXChat({
  agent: agent.value,
});

const handlerClearSubmit = () => {
  setAttachedFiles([]);
  setHeaderOpen(false);
  setContent("");
};

const handlerClearSession = () => {
  setMessages([]);
};

const onSubmit = async (nextContent: string) => {
  if (!nextContent) return;
  const from = {
    content: nextContent,
    files: attachedFiles.value,
    oldMsgList: items.value.map((item: any) => {
      return {
        content: item.content,
      };
    }),
  };
  const jsonStrContent = JSON.stringify(from);
  onRequest(jsonStrContent);
  setContent("");
  setAttachedFiles([]);
  setHeaderOpen(false);
};

const onReplyRequest = (content: string) => {
  console.log(content, "@@@onReplyRequest");
  onRequest(content);
};

const onCopyResult = (content: any) => {
  const replaceHtmlStr = md.render(content).replace(/<[^>]*>?/gm, "");
  navigator.clipboard.writeText(replaceHtmlStr);
  ElMessage.success("复制成功，请粘贴内容");
};

const placeholderFn = (type: string) => {
  return type === "drop"
    ? { title: "选取图片" }
    : {
        icon: h(CloudUploadOutlined),
        title: "上传图片",
        description: "点击上传图片",
      };
};

const content = ref("");

const setContent = (val: string) => {
  content.value = val;
};

const headerOpen = ref(false);

const setHeaderOpen = (flag: boolean) => {
  headerOpen.value = flag;
};

const setAttachedFiles = (paramFiles: any) => {
  console.log(paramFiles, "paramFiles111");
  attachedFiles.value = paramFiles;
};

const attachmentsNode = h(
  Badge,
  {
    dot: attachedFiles.value.length > 0 && !headerOpen,
  },
  [
    h(Button, {
      type: "text",
      icon: h(PaperClipOutlined),
      onClick: () => {
        return setHeaderOpen(!headerOpen.value);
      },
    }),
  ]
);

const attachmentsRef = ref(null);

const handleFileChange = (info: any) => {
  console.log(info, "info附件");
  if (info.file.size) {
    const currentFile = Object.assign(
      info.file,
      {},
      {
        name: info.file.name,
        url: URL.createObjectURL(info.file),
      }
    );
    return setAttachedFiles([...attachedFiles.value, currentFile]);
  } else {
    return setAttachedFiles(info.fileList);
  }
};

// ==================== Nodes ====================
const placeholderPromptsItems: PromptsProps["items"] = [
  {
    key: "1",
    label: h(
      "div",
      {
        display: "flex",
        alignItems: "center",
        gap: 8,
      },
      [
        h(ProfileOutlined),
        h(
          "span",
          {
            style: {
              "padding-left": "10px",
            },
          },
          ["文档指南"]
        ),
      ]
    ),
    description: "你想了解哪门技术框架?",
    children: [
      {
        key: "1-1",
        icon: h(ProfileOutlined),
        description: `Vue技术框架开发文档`,
      },
      {
        key: "1-2",
        icon: h(ProfileOutlined),
        description: `React技术框架开发文档`,
      },
      {
        key: "1-3",
        icon: h(ProfileOutlined),
        description: `Node技术框架开发文档`,
      },
    ],
  },
  {
    key: "2",
    label: h(
      "div",
      {
        display: "flex",
        alignItems: "center",
        gap: 8,
      },
      [
        h(NotificationOutlined),
        h(
          "span",
          {
            style: {
              "padding-left": "10px",
            },
          },
          ["热门话题"]
        ),
      ]
    ),
    description: "你关注哪些热点新闻?",
    children: [
      {
        key: "2-1",
        icon: h(NotificationOutlined),
        description: `普通人存款多少可以躺平`,
      },
      {
        key: "2-2",
        icon: h(NotificationOutlined),
        description: `不会被AI替代的职业有哪些`,
      },
      {
        key: "2-3",
        icon: h(NotificationOutlined),
        description: `北京第三代社保卡更换指南`,
      },
    ],
  },
];

const placeholderNode = h(
  Space,
  {
    direction: "vertical",
    align: "center",
    size: 16,
  },
  [
    h(Welcome, {
      variant: "borderless",
      icon: "https://www.flowertip.site/pro/favicon.svg",
      title: "您好, 我是您的智能对话交互助手",
      description: "我是狗尾巴花的尖，FlowerTip Admin 智能对话交互助手",
      style: {
        width: "530px",
      },
    }),
    h(Prompts, {
      title: "你想要做什么?",
      items: placeholderPromptsItems,
      styles: {
        list: {
          width: "530px",
        },
        item: {
          flex: 1,
        },
      },
      onItemClick: () => {
        console.log("onItemClick");
      },
    }),
  ]
);

const items = computed<any>(() => {
  return messages.value.map((item) => {
    console.log(item, "@@@@item");
    const { id, message, status } = item;
    let msgContent = "";
    if (status === "local" && isIndexOfFiles(message as string)) {
      const jsContentObj = JSON.parse(message as string);
      msgContent = jsContentObj;
    } else {
      msgContent = message;
    }

    const renderFooterContent = {
      local: h(Space, { size: "small" }, [
        h(
          Button,
          {
            color: "primary",
            variant: "outlined",
            size: "small",
            icon: h(SyncOutlined),
            onClick: () => onReplyRequest(msgContent),
          },
          ["再试一次"]
        ),
      ]),
      loading: null,
      ai: h(Space, { size: "small" }, [
        h(
          Button,
          {
            color: "primary",
            variant: "outlined",
            size: "small",
            icon: h(CopyOutlined),
            onClick: () => onCopyResult(item.message),
          },
          ["复制内容"]
        ),
      ]),

      // (<Space size="small">
      //   <Button color="primary" variant="outlined" size="small" icon={<SyncOutlined />} onClick={() => onReplyRequest(msgContent)}>再试一次</Button>
      // </Space>),
      // loading: null,
      // ai: (<Space size="small">
      //   <Button color="primary" variant="outlined" size="small" icon={<CopyOutlined />} onClick={() => onCopyResult(item.message)}>复制内容</Button>
      // </Space>)
    };

    return {
      key: id,
      loading: message == "loading",
      role: status === "local" ? "local" : "ai",
      content: msgContent,
      footer:
        status == "local"
          ? renderFooterContent[status]
          : message == "loading"
          ? renderFooterContent["loading"]
          : renderFooterContent["ai"],
      messageRender: (content: any) => {
        if (status == "local") {
          if (content.files && content.files.length > 0) {
            const diyComponent = h(
              "div",
              {
                style: {
                  width: "250px",
                },
              },
              [
                ...content.files.map((item: any, index: number) => {
                  return h(Image, {
                    key: index,
                    width: 250,
                    src: item.url,
                    style: { display: "block" },
                  });
                }),
                h("p", null, [content.content]),
              ]
            );
            return renderMarkdown(diyComponent);
          } else {
            const msg = typeof content == "string" ? content : content.content;
            return renderMarkdown(msg);
          }
        } else {
          return renderMarkdown(content);
        }
      },
    };
  });
});

const fItems = computed(() => {
  return items.value.length > 0
    ? items.value
    : [{ content: placeholderNode, variant: "borderless" }];
});

const uStore = useUserStore();

const roles: BubbleListProps["roles"] = {
  ai: {
    placement: "start",
    header: "狗尾巴花的尖",
    avatar: {
      icon: h("img", {
        src: "https://www.flowertip.site/pro/favicon.svg",
        alt: "logo",
      }),
      style: { background: "#fff" },
    },
    typing: { step: 5, interval: 20 },
    style: {
      marginInlineEnd: 16,
    },
    styles: {
      footer: {
        width: "100%",
      },
    },
    loadingRender: () =>
      h(Space, null, [h(Spin, { size: "small" }), "我正在整理思路，请稍等..."]),
  },
  local: {
    placement: "end",
    header: uStore.username,
    avatar: { icon: h(UserOutlined), style: { background: "#3170FF" } },
    style: {
      marginInlineStart: 16,
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_layout {
  width: 100%;
  height: auto;
  min-width: 530px;
  display: flex;

  .chat {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10;
  }

  ::v-deep(.ant-bubble-list) {
    flex: 1;
  }

  .sender {
    box-shadow: var(--el-box-shadow-light);
  }

  .logo {
    display: flex;
    height: 72px;
    align-items: center;
    justify-content: start;
    padding: 0 24px;
    box-sizing: border-box;

    img {
      width: 24px;
      height: 24px;
      display: inline-block;
    }

    span {
      display: inline-block;
      margin: 0 8px;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
