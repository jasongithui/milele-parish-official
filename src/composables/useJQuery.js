// src/composables/useJQuery.js
import $ from 'jquery'
export function useJQuery() {
    if (typeof window.$ === 'undefined') {
      window.$ = window.jQuery = window.jquery = $
    }
  }

  
  