// src/composables/useExternalScript.js
export function useExternalScript(src, callback) {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => callback && callback()
  document.head.appendChild(script)
}
