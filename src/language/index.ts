import { createI18n } from 'vue-i18n';
// 从语言包文件中导入语言包对象
import zh from './modules/zh';
import en from './modules/en';

const messages = {
  'zh-cn': zh,
  'en-us': en
}

const language = sessionStorage.getItem('lang') || (navigator.language || 'en-us').toLocaleLowerCase() // 这是获取浏览器的语言
// 获取浏览器当前使用的语言，并进行处理 
const i18n = createI18n({ 
  legacy: false,
  locale: language, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh-cn', // 设置备用语言
  messages,
})

export default i18n;