// src/composables/useFancyboxOnRoute.js
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export function useFancyboxOnRoute(selector = '[data-fancybox]') {
  const route = useRoute()

  const bindFancybox = () => {
    nextTick(() => {
      setTimeout(() => {
        if ($(selector).length) {
          try {
            // Destroy previously initialized Fancybox instances (optional)
            $('[data-fancybox]').fancybox?.destroy?.()

            // Re-initialize
            $(selector).fancybox()
            console.log('✅ Fancybox initialized for', selector)
          } catch (err) {
            console.warn('❌ Fancybox failed to initialize:', err)
          }
        }
      }, 300) // Give the DOM time to render new content
    })
  }

  onMounted(bindFancybox)
  watch(() => route.fullPath, bindFancybox)
}
