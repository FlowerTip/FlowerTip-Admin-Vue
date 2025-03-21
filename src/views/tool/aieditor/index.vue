<template>
  <div ref="divRef" style="height: 100%">
  </div>
</template>

<script setup lang="ts">
import { AiEditor, type OpenaiModelConfig } from "aieditor";
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref } from "vue";

const divRef = ref();
let aiEditor: AiEditor | null = null;

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "输入任何你想要编写的内容，AI功能可以帮助你优化完善内容。",
    content: '',
    ai: {
      models: {
        openai: {
          endpoint: "https://api.chatanywhere.tech",
          model: "gpt-3.5-turbo",
          apiKey: "sk-XKL1YHDdy9VHWZeDdiXNbswkHumM2fllSe7JH5ZR3v8oL8El"
        } as OpenaiModelConfig
      }
    },
  })
})

onUnmounted(() => {
  aiEditor && aiEditor.destroy();
})
</script>

<style lang="scss" scoped>
::v-deep(.aie-container) {
  aie-footer {
    div {
      display: none !important;
    }
  }
}
</style>