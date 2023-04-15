<script setup>
import emitter from "../utils/mitt.js";

import IconTheme from './icons/IconTheme.vue'
import IconDocumentation from './icons/IconDocumentation.vue'
import IconEcosystem from './icons/IconEcosystem.vue'
import IconTooling from './icons/IconTooling.vue'
import SupportIcon from './icons/IconSupport.vue'

const changeTheme = (className) => {
  const themeColor = localStorage.getItem('themeColor') === '#1E1E1E' ? '#ffffff' : '#1E1E1E'
  document.documentElement.style.setProperty('--vt-c-white', themeColor);
  document.documentElement.style.setProperty('--vt-c-black', themeColor === '#1E1E1E' ? 'rgba(255, 255, 255, .87)' : '#1E1E1E');
  localStorage.setItem('themeColor', themeColor)
  createTip(className)
}

const changeAccordion = (className) => {
  emitter.emit("accordion", true)
  createTip(className)
}

const changeSwitchList = (className) => {
  emitter.emit("switchList", true)
  createTip(className)
}

const changeGuidePosition = ((className) => {
  const guidePosition = localStorage.getItem('guidePosition') === '0px' ? 'calc(50% - 32px)' : '0px'
  document.documentElement.style.setProperty('--position-center', guidePosition);
  localStorage.setItem('guidePosition', guidePosition)
  createTip(className)
})

const createTip = (className) => {
  const slideHint = (dependElement, status = true, text, color, time = 2100) => {

    let hintElement = document.createElement("div");
    const onlyClass = 'only' + new Date().getTime()
    hintElement.className = `copy-message ${onlyClass}`
    hintElement.style.color = color || (status ? '#67C23A' : '#F56C6C')
    hintElement.innerText = text || (status ? '复制成功' : '复制失败')

    document.querySelector(dependElement).appendChild(hintElement)

    setTimeout(() => document.querySelector('.' + onlyClass).remove(), time)
  }
  try {

    navigator.clipboard?.writeText && navigator.clipboard.writeText('0571-28187666')

    let tipsTxt = {
      '.i1': '主题切换',
      '.i2': '手风琴模式',
      '.i3': '展开折叠（bug）',
      '.i4': '索引位置切换',
    }

    slideHint(className, true, tipsTxt[className])

  } catch (e) {

    slideHint(className, false)

    console.error('复制错误 => ', e)
  }
}
</script>
<template>
  <div class="settings">
    <div class="sticky">
      <i @click="changeTheme('.i1')" class="i1">
        <IconTheme />
      </i>
      <i @click="changeAccordion('.i2')" class="i2">
        <IconEcosystem />
      </i>
      <i @click="changeSwitchList('.i3')" class="i3">
        <IconDocumentation />
      </i>
      <i @click="changeGuidePosition('.i4')" class="i4">
        <IconTooling />
      </i>
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  z-index: 98;
  width: 100px;
}
.sticky {
  top: 30px;
  position: sticky;
}
i {
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.4s;
}
</style>
<style>
@keyframes moveHint {
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  40% {
    transform: translateX(-1rem);
    opacity: 1;
  }
  60% {
    transform: translateX(-1rem);
    opacity: 1;
  }
  100% {
    transform: translateX(-4rem);
    opacity: 0;
  }
}
.copy-message {
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  width: 6rem;
  transform: translateX(-50%);
  z-index: -1;
  font-size: 1rem;
  user-select: none;
  animation: moveHint 2s forwards;
}
</style>
