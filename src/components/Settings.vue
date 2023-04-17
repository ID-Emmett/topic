<script setup>
import emitter from "../utils/mitt.js";

import IconTheme from './icons/IconTheme.vue'
import IconDocumentation from './icons/IconDocumentation.vue'
import IconEcosystem from './icons/IconEcosystem.vue'
import IconTooling from './icons/IconTooling.vue'
import IconCommunity from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import { nextTick, ref, watch } from 'vue'
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


const openBrushModal = ref(false)
const switchStatus = ref(false)

const timeVal = ref(localStorage.getItem('timeVal') || 5)

watch(timeVal, (count, prevCount) => {
  switchStatus.value = false
  if (count < 5) timeVal.value = 5
  document.documentElement.style.setProperty('--scrollbar-background', '#e4974f');

  if (!switchStatus.value) {
    stopBtn.value = false
    countdown.value = 'stop'
  }
})

const switchFn = (() => {

  if (!timeVal.value) return

  localStorage.setItem('timeVal', timeVal.value)

  switchStatus.value = !switchStatus.value

  document.documentElement.style.setProperty('--scrollbar-background', !switchStatus.value ? '#e4974f' : 'transparent');

  automationFn()
})

const countdown = ref('stop')

let countdownClock = null
let clock = null
let responders = null

const automationFn = (() => {
  let contentDoms = document.getElementsByClassName('contentTxt')


  // return setTop(90)

  let randomVal = null

  function creatdRandom (oldVal) {
    let newVal = Math.floor(Math.random() * (contentDoms.length - 0 + 1) + 0)
    if (newVal === oldVal) return creatdRandom(oldVal)
    randomVal = newVal
    return newVal
  }
  clearInterval(responders)
  responders = setTimeout(() => {
    clearInterval(responders)
    if (!stopBtn.value && switchStatus.value) setTop(creatdRandom(randomVal))
  }, 800);

  clearInterval(clock)

  clock = setInterval(() => {

    if (!switchStatus.value) return clearInterval(clock)

    setTop(creatdRandom(randomVal))

  }, timeVal.value * 1000);
})

const countdownClockFn = ((val) => {
  clearInterval(countdownClock)
  if (!switchStatus.value && !stopBtn.value) return countdown.value = 'stop'
  countdown.value = val || timeVal.value
  countdownClock = setInterval(() => {
    countdown.value--
    if (!switchStatus.value || countdown.value <= 0) {
      clearInterval(countdownClock)
      countdown.value = 'stop'
      if (val) automationFn()
    }
  }, 1000)
})

const setTop = ((randomTopic) => {

  randomTopic = 'target' + randomTopic

  countdownClockFn()

  const targetDom = document.getElementById(randomTopic)
  const parent = document.getElementById('main')

  const allClientHeight = document.body.clientHeight
  const showClientHeight = window.innerHeight
  const scrollTop = document.documentElement.scrollTop
  const targetVal = targetDom.offsetParent.offsetParent.offsetTop

  // console.log('总高度', allClientHeight)
  // console.log('可视高度', showClientHeight)
  // console.log('滚动条高度', scrollTop);
  // console.log('元素距根顶高度', targetVal);

  let isCenter = (allClientHeight - targetVal) < showClientHeight
  const centerVal = isCenter ? (allClientHeight - (targetVal + showClientHeight)) : 0
  parent.style.transform = `translateY(${scrollTop - targetVal - centerVal}px)`

  setTimeout(() => {
    parent.style.transition = 'background .4s'
    parent.style.transform = `translateY(0px)`
    window.location.hash = "#" + randomTopic
    setTimeout(() => {
      parent.style.transition = 'transform 2s'
      const clientRectTop = document.getElementById(randomTopic).getBoundingClientRect().top

      if (clientRectTop + targetDom.parentNode.scrollHeight > showClientHeight || (showClientHeight + targetVal > allClientHeight)) {

        if (targetDom.parentNode.scrollHeight > showClientHeight) return
        setTimeout(() => {
          if (targetDom.parentNode.scrollHeight < 0) parent.style.transform = `translateY(${targetDom.parentNode.scrollHeight})`

        }, 2000);
        parent.style.transform = `translateY(-${clientRectTop + targetDom.parentNode.scrollHeight - showClientHeight + 20}px)`
      } else {

        parent.style.transform = `translateY(${(showClientHeight - targetDom.parentNode.scrollHeight) / 2}px)`

      }

    }, 1000);
    targetDom.click('randomTopic')
  }, 2000);

})

const changeAutoBrush = (className => {

  createTip(className, true, false, '#409eff', 2100)
  openBrushModal.value = !openBrushModal.value
  if (openBrushModal.value) nextTick(() => document.getElementById('inputTime').focus())

})

const changeBackground = ((className) => {
  createTip(className)
  let bg = localStorage.getItem('bg') === '0px' ? 'auto' : '0px'
  document.documentElement.style.setProperty('--background-size', bg)
  localStorage.setItem('bg', bg === '0px' ? '0px' : 'auto')
})

const stopBtn = ref(false)
const changeStop = ((className) => {
  createTip(className, true, switchStatus.value ? stopBtn.value ? '启动' : '暂停' : '暂停自动选题',)

  if (!switchStatus.value) return

  stopBtn.value = !stopBtn.value

  if (stopBtn.value) {
    clearInterval(clock)
    clearInterval(countdownClock)
  } else {
    countdownClockFn(countdown.value)
  }

})

const tipsTxt = {
  '.i1': '主题切换',
  '.i2': '手风琴模式',
  '.i3': '展开折叠',
  '.i4': '索引位置切换',
  '.i5': '切换背景',
  '.i6': '随机选题',
  '.i7': '暂停自动选题',
}
const createTip = (dependElement, status = true, text, color, time = 2100) => {

  // navigator.clipboard?.writeText && navigator.clipboard.writeText('0571-28187666')

  let hintElement = document.createElement("div");
  const onlyClass = 'only' + new Date().getTime()
  hintElement.className = `copy-message ${onlyClass}`
  hintElement.style.color = color || (status ? '#67C23A' : '#F56C6C')
  hintElement.innerText = text || tipsTxt[dependElement] || (status ? '复制成功' : '复制失败')

  document.querySelector(dependElement).appendChild(hintElement)

  setTimeout(() => document.querySelector('.' + onlyClass).remove(), time)
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
      <i @click="changeBackground('.i5')" class="i5">
        <IconCommunity />
      </i>
      <i @click="changeAutoBrush('.i6')" class="i6">
        <SupportIcon />
      </i>
      <i @click="changeStop('.i7')" class="i7">
        <h3>{{ countdown }}</h3>
      </i>
    </div>
  </div>

  <Teleport to="body">
    <transition name="fade">
      <div v-if="openBrushModal" class="brush-modal" @mouseleave="openBrushModal = false">
        <span class="dec">选题间隔时间 </span>&nbsp&nbsp
        <input id="inputTime" type="number" oninput="value=value.replace(/[^\d]/g,'')" v-model="timeVal" />&nbsp
        <span class="unit">秒 </span>&nbsp&nbsp
        <span :class="[switchStatus ? 'switch-checked' : '', 'switch-btn']" @click="switchFn"></span>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  z-index: 98;
}
.sticky {
  top: 30px;
  right: 30px;
  position: fixed;
}

i {
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 50px;
  height: 50px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.4s;
}
i h3 {
  user-select: none;
  color: var(--vt-c-black);
  opacity: 0.8;
}
.brush-modal {
  position: fixed;
  z-index: 999;
  top: 342px;
  right: 100px;
  width: 350px;
  margin-left: -150px;
  box-shadow: 0 2px 12px 0 rgba(35, 180, 59, 0.2);
  padding: 40px;
  /* background: var(--color-background); */
  transition: background 0.4s;
  user-select: none;
}

.dec {
  color: #409eff;
}
.brush-modal input {
  background-color: var(--color-background);
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 25px;
  line-height: 25px;
  outline: none;
  padding: 0 0 0 15px;
  transition: border-color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) background-color 0.4;
  width: 70px;
}
.brush-modal input:focus {
  outline: none;
  border-color: #409eff;
}
.switch-btn {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.4s, background-color 0.4s;
  vertical-align: middle;
  width: 40px;
  border-color: #dcdfe6;
  background-color: #dcdfe6;
}
.switch-checked {
  border-color: rgb(19, 206, 102);
  background-color: rgb(19, 206, 102);
}

.switch-checked:after {
  left: 100%;
  margin-left: 20px;
}
.switch-btn:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.unit {
  font-size: 0.5rem;
  color: #a5a2a2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
:deep() .copy-message {
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
@media (max-width: 1024px) {
  .sticky {
    display: flex;
    position: static;
  }
}
</style>
