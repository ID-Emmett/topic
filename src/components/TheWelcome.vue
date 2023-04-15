<script setup>
import { ref } from 'vue'
import emitter from "../utils/mitt.js";



defineProps({
  textData: {
    type: Object,
    required: true
  }
})

emitter.on("accordion", (res) => {
  if (!accordion.value) switchList.value = false
  accordion.value = !accordion.value

})
emitter.on("switchList", (res) => {
  accordion.value = false
  switchList.value = !switchList.value
})

const switchList = ref(false)

const accordion = ref(true)

const heightObj = { activity: null }

const txtDom = ref()

const fold = (i) => {

  const h = txtDom.value[i].scrollHeight

  heightObj[i] = heightObj[i] === undefined ? (accordion.value ? h : (switchList.value ? 0 : h)) : heightObj[i] === h ? 0 : h

  if (accordion.value) {
    for (const key in heightObj) {
      if (key === 'activity') heightObj.activity = heightObj.activity === i ? null : i
      else txtDom.value[key].style.height = 0 + 'px'
    }
    setTimeout(() => {
      txtDom.value[i].style.height = (heightObj.activity === i ? h : 0) + 'px'
    }, 10);
  } else {
    txtDom.value[i].style.height = (switchList.value ? h : 0) + 'px'
    setTimeout(() => {
      txtDom.value[i].style.height = heightObj[i] + 'px'
    }, 10);
  }

}
</script>

<template>
  <div class="item" v-for="(item, index) in textData" :key="'index' + index">
    <i @click="fold(index)">{{ index + 1 }}</i>
    <div class="details">
      <h3 v-html="item.name" @click="fold(index)"></h3>
      <div v-html="`<pre>${item.value}</pre>`" :class="[switchList ? 'openTxt' : 'closeTxt']" ref="txtDom"></div>
    </div>
  </div>
</template>
<style>
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  *word-wrap: break-word;
  *white-space: normal;
  text-align: start;
  width: 1200px;
  padding: 4rem 0 6rem 0 !important;
  font-size: 1.1rem;
  color: var(--vt-c-black);
  transition: color 0.5s;
  font-weight: 400;
  line-height: 2rem;
}
pre span {
  color: #e6a23c;
  color: #67c23a;
  letter-spacing: 0.021em;
}
h3 span {
  color: #409eff;
  color: #f56c6c;
  color: #6483a1;
  letter-spacing: 0.021em;
}
</style>
<style scoped>
.item {
  margin-top: 0rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: calc(var(--section-gap) / 2);
}
.openTxt {
  transition: all 0.4s;
  overflow: hidden;
}
.closeTxt {
  height: 0px;
  transition: all 0.4s;
  overflow: hidden;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  user-select: none;
  cursor: pointer;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  /* color: var(--color-heading); */
  color: #409eff;
  font-synthesis: style;
  font-weight: 600;
  font-family: sans-serif;
  letter-spacing: 0.011em;
  user-select: none;
  cursor: pointer;
  display: inline-block;
  line-height: 4rem;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0rem;
    margin-left: calc(var(--section-gap) / 2);
    padding-bottom: 0;
  }

  i {
    top: var(--position-center);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
    z-index: 4;
    margin-top: 0.5rem;
    transition: top 0.9s, background 0.5s;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50%);
    height: calc(50% - 25px);
    z-index: 3;
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50%);
    height: calc(50% + 25px);
    z-index: 3;
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>