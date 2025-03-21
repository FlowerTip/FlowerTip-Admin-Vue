<template>
  <div class="container">
    <!-- 默认使用 -->
    <VueQrcode :value="qrcode_value" :width="200" style="border: 1px solid #ccc; padding: 10px;"/>
    <el-input v-model="qrcode_value" style="width: 224px; padding-top: 20px;" disabled></el-input>
  </div>
</template>


<script setup lang="ts">
import { VueQrcode } from '@sumdoo/vue-qrcode'
import { ref } from 'vue'

const qrcode_value = ref('https://www.flowertip.site')

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>