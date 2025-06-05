<template>
<div class="cursor" :class="{ hovered: isHovering}" ref="cursor1" :style="cursorStyle1" v-show="!isHidden" v-if="!isMobile"></div>
    <div class="cursor2" ref="cursor2" :style="cursorStyle2" v-show="!isHidden" v-if="!isMobile"></div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor1 = ref(null)
const cursor2 = ref(null)

const cursorStyle1 = ref({})
const cursorStyle2 = ref({})
const isHidden = ref(true)
const isHovering = ref(false)
const isMobile = ref(false)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0

const lerp = (start, end, amt) => (1 - amt) * start + amt * end

function detectMobile() {
  isMobile.value = /Mobi|Android|iPhone|iPad|iPod|Touch/.test(navigator.userAgent)
}

function onMouseMove(e) {
  if (isMobile.value) return

  mouseX = e.pageX
  mouseY = e.pageY
  isHidden.value = false

  const el = document.elementFromPoint(mouseX, mouseY)
  isHovering.value = el && (el.matches('.hover-target') || el.matches('a') || el.matches('h2') || el.matches('router-link'))
}

function onMouseLeave() {
  if (isMobile.value) return

  isHidden.value = true
  isHovering.value = false
}

function animate() {
  if(isMobile.value) return
  
  currentX = lerp(currentX, mouseX, 0.07)
  currentY = lerp(currentY, mouseY, 0.07)

  const cursor1El = cursor1.value
  const cursor2El = cursor2.value

  const offset1X = cursor1El?.offsetWidth / 2 || 0
  const offset1Y = cursor1El?.offsetHeight / 2 || 0
  const offset2X = cursor2El?.offsetWidth / 2 || 0
  const offset2Y = cursor2El?.offsetHeight / 2 || 0

  cursorStyle1.value = {
    transform: `translate3d(${currentX - offset1X}px, ${currentY - offset1Y}px, 0)`,
    width: isHovering.value ? '100px' : '50px',
    height: isHovering.value ? '100px' : '50px',
    mixBlendMode: isHovering.value ? 'difference' : 'difference',
    backgroundColor: isHovering.value ? '#c6c6c6' : ''
  }

  cursorStyle2.value = {
    transform: `translate3d(${mouseX - offset2X}px, ${mouseY - offset2Y}px, 0)`

  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  detectMobile()
  if (!isMobile.value) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    animate()
  }
})

onUnmounted(() => {
  if(!isMobile.value) {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeave)
  }
})
</script>

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor1 = ref(null)
const cursor2 = ref(null)

const cursorStyle1 = ref({})
const cursorStyle2 = ref({})
const isHidden = ref(true)
const isHovering = ref(false)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0

const lerp = (start, end, amt) => (1 - amt) * start + amt * end

function onMouseMove(e) {
  mouseX = e.pageX
  mouseY = e.pageY
  isHidden.value = false

  const el = document.elementFromPoint(mouseX, mouseY)
  isHovering.value = el && (el.matches('.hover-target'))
}

function onMouseLeave() {
  isHidden.value = true
  isHovering.value = false
}

function animate() {
  currentX = lerp(currentX, mouseX, 0.05)
  currentY = lerp(currentY, mouseY, 0.05)

  const offset1 = cursor1.value ? cursor1.value.offsetWidth / 2 : 0
  const offset2 = cursor2.value ? cursor2.value.offsetWidth / 2 : 0

  cursorStyle1.value = {
    left: `${currentX - offset1}px`,
    top: `${currentY - offset1}px`,
    width: isHovering.value ? '100px' : '50px',
    height: isHovering.value ? '100px' : '50px',
    mixBlendMode: isHovering.value ? 'difference' : 'difference',
    backgroundColor: isHovering.value ? '#c6c6c6' : ''
  }

  cursorStyle2.value = {
    left: `${mouseX - offset2}px`,
    top: `${mouseY - offset2}px`,
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
})
</script> -->




<style scoped>
.cursor{
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #c6c6c6;
  border-radius: 50%;
  pointer-events: none;
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, transform 0.1s;
  z-index: 1000;
  will-change: transform;
  background-color: rgba(255, 255, 255, 0.3);
  mix-blend-mode: difference;
  
  /* transform: translate(-50%, -50%) !important; */
}

.cursor2{
  position: absolute;
  width: 9px;
  height: 9px;
  background-color: #c6c6c6;
  border-radius: 50%;
  pointer-events: none;
  transition: .15s;
  z-index: 1000;
  will-change: transform;
  /* transform: translate(-50%, -50%) !important; */
}

.content:hover ~ .cursor{
  transform: translate(-50%, -50%) scale(1.5);
  background-color: #c6c6c6;
  opacity: .5;
}

.content:hover ~ .cursor2{
  opacity: 0;
}
.hidden {
  opacity: 0;
}
</style>