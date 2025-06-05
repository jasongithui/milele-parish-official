// src/composables/useLocomotiveScroll.js

export function useLocomotiveScroll() {
  
const script = document.createElement('script')
  script.src = '/js/locomotive-scroll.min.js'
  script.onload = () => {
    console.log('locomotive-scroll loaded successfully')
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.03,
    });
  }
  script.onerror = () => {
    console.error('Failed to load locomotive-scroll')
  }
  document.head.appendChild(script)
}