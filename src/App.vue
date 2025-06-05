<template>
  <Preloader />
  <div class="page-wrapper" data-scroll-container>
   
    <!-- Global nav -->
  <Navbar />
  <!-- Page-specific content will appear here -->
  <router-view />
  <!-- Global footer -->
  <Footer />
   <CustomCursor />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'             
import CustomCursor from '@/components/CustomCursor.vue'             
import Preloader from '@/components/Preloader.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import { useJQuery } from '@/composables/useJQuery.js'
import { useLocomotiveScroll } from '@/composables/useLocomotiveScroll.js'
import { useExternalScript } from '@/composables/useExternalScript'




onMounted(() => {
useJQuery()
// Main javascript logic script
useExternalScript('/js/main.js', () => {
    console.log('mainJs script is ready')
  })
// fancybox js
useExternalScript('https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.0/jquery.fancybox.min.js', () => {
    console.log('Fancybox script is ready')
  })
// locomotive scroll logic
useLocomotiveScroll()



})

</script>
