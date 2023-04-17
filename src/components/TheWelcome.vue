<script setup>
import { ref } from 'vue'
import emitter from "../utils/mitt.js";



defineProps({
  textData: {
    type: Object,
    required: true
  }
})


const switchList = ref(false)

const accordion = ref(true)

let heightObj = { activity: null }

const txtDoms = ref()

const fold = (i) => {

  const h = txtDoms.value[i].scrollHeight

  heightObj[i] = heightObj[i] === undefined ? (accordion.value ? h : (switchList.value ? 0 : h)) : heightObj[i] === h ? 0 : h

  if (accordion.value) {
    for (const key in heightObj) {
      if (key === 'activity') heightObj.activity = heightObj.activity === i ? null : i
      else txtDoms.value[key].style.height = 0 + 'px'
    }
    setTimeout(() => {
      txtDoms.value[i].style.height = (heightObj.activity === i ? h : 0) + 'px'
    }, 10);
  } else {
    txtDoms.value[i].style.height = (switchList.value ? h : 0) + 'px'
    setTimeout(() => {
      txtDoms.value[i].style.height = heightObj[i] + 'px'
    }, 10);
  }

}

emitter.on("accordion", (res) => {
  if (accordion.value) return
  accordion.value = !accordion.value
  if (switchList.value || Object.keys(heightObj).length !== 1) switchListFn(true)
})
emitter.on("switchList", (res) => {
  accordion.value = false
  switchListFn()
})

const switchListFn = (status = false) => {
  let contentDoms = document.getElementsByClassName('contentTxt')

  for (let i = 0; i < contentDoms.length; i++) {
    contentDoms[i].style.height = switchList.value || status ? 0 : txtDoms.value[i].scrollHeight + 'px'
  }
  contentDoms = null

  switchList.value = status ? false : !switchList.value
  heightObj = { activity: null }
}
</script>

<template>
  <div class="item" v-for="(item, index) in textData" :key="'index' + index">
    <i @click="fold(index)">{{ index + 1 }}</i>
    <div class="details">
      <h3 v-html="item.name" @click="fold(index)" :id="`target${index}`" class="details-title"></h3>
      <div v-html="`<pre>${item.value}</pre>`" :class="[switchList ? 'openTxt' : 'closeTxt', 'contentTxt']" ref="txtDoms"></div>
    </div>
  </div>
</template >
<style scoped>
.item {
  margin-top: 0rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: calc(var(--section-gap) / 4);
}
.details-title {
  opacity: 1;
  transition: opacity 0.4s;
}
.openTxt {
  height: auto;
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
  user-select: none;
  color: var(--color-text);
  cursor: pointer;
  flex-shrink: 0;
  top: var(--position-center);
  left: -26px;
  position: absolute;
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
  bottom: 50%;
  height: calc(50% - 25px);
  z-index: 3;
}

.item:after {
  content: ' ';
  border-left: 1px solid var(--color-border);
  position: absolute;
  left: 0;
  top: 50%;
  height: calc(50% + 25px);
  z-index: 3;
}

.item:first-of-type:before {
  display: none;
}

.item:last-of-type:after {
  display: none;
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
:deep() pre {
  white-space: pre-line;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  *word-wrap: break-word;
  *white-space: normal;
  text-align: start;
  width: inherit;
  padding: 4rem 0 6rem 0 !important;
  font-size: 1.1rem;
  color: var(--vt-c-black);
  transition: color 0.5s;
  font-weight: 400;
  line-height: 2rem;
}
:deep() pre span {
  color: #e6a23c;
  color: #67c23a;
  letter-spacing: 0.021em;
}
:deep() h3 span {
  color: #409eff;
  color: #f56c6c;
  color: #6483a1;
  letter-spacing: 0.021em;
}
@media (min-width: 1024px) {
  :deep() pre {
    white-space: pre-wrap;
  }
  .item {
    margin-top: 0rem;
    margin-left: calc(var(--section-gap) / 2);
    padding-bottom: 0;
  }
  i {
    border: 1px solid var(--color-border);
  }
  .details {
    flex: 1;
    margin-left: calc(var(--section-gap) / 2);
  }
}
</style>