<script setup>
import { ref, onMounted, nextTick } from 'vue'
import TheWelcome from './components/TheWelcome.vue'
import Settings from './components/Settings.vue'

const textData = ref({})
// 请求资源
try {
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://id-emmett.github.io/topic/myRecord.js'
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let jsContent = xhr.responseText;

      // 使用正则处理myRecord.js中的内容，返回数组对象
      const regex = /\s*\/\/\?\s*(.*?)\s*\/\*([\s\S]*?)\*\//g;
      const matches = jsContent.matchAll(regex);

      const results = [];
      for (const match of matches) {
        const name = match[1];
        const value = match[2];
        // results.push(`{'${name}':\n\`${value}\`\n}`);
        results.push(`{name: '${name}',value: \`${value}\`}`);
      }

      let textFormat = eval('[' + results.join(',') + ']')

      // 高亮处理
      function addSpanTags (str) {
        const regex = /([^\u4e00-\u9fa5，。、；‘’“”！？【】《》（）「」『』【】·`~!@#$%^&*()_+=[\]\\{}|;':",/<>?\s]*[a-zA-Z]+[^\u4e00-\u9fa5，。、；‘’“”！？【】《》（）「」『』【】·`~!@#$%^&*()_+=[\]\\{}|;':",./<>?\s]*)/g;
        return str.replace(regex, match => `<span>${match}</span>`);
      }

      textFormat.forEach(e => {
        e.name = addSpanTags(e.name)
        e.value = addSpanTags(e.value)
      });

      // console.log(textFormat);

      textData.value = textFormat
    }
  };
  xhr.send();
} catch (e) {
  console.error('数据处理错误 👇');
  console.error(e);
}

const themeColor = localStorage.getItem('themeColor')
document.documentElement.style.setProperty('--vt-c-white', themeColor);
document.documentElement.style.setProperty('--vt-c-black', themeColor === '#1E1E1E' ? 'rgba(255, 255, 255, .87)' : '#1E1E1E');
document.documentElement.style.setProperty('--position-center', localStorage.getItem('guidePosition'));
document.documentElement.style.setProperty('--background-size', localStorage.getItem('bg') || 'auto')

setTimeout(() => {
  document.querySelector('body').style.setProperty('transition', 'color 0.3s, background-color 0.5s');
}, 0);

console.log('%c\n半颗牙齿晒太阳\n', 'color: #43bb88;font-size: 40px;font-weight: bold;');

console.log('%c 仓库地址：','color:#E6A23C', '.........')

console.warn('%c\n自动刷题建议开启手风琴模式\n', 'color: #E6A23C;font-size: 24px;font-weight: bold;text-decoration: underline;') 


</script>

<template>
  <main id="main">
    <TheWelcome :textData="textData" />
  </main>
  <Settings />
</template>
<style scoped>
#main {
  max-width: 1440px;
  margin: 0 auto;
  transform: translateY(0);
  transition: transform 2s;
}
</style>