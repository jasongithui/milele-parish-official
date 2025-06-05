<!-- src/components/LearnMore.vue -->
<template>
    <router-link :to="link" class="learn-more" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <span aria-hidden="true" class="circle">
        <span class="icons arrows cross">
          <SvgIcon :hovered="isHovered" />
        </span>
      </span>
      <span class="button-text">{{ title }}</span>
    </router-link>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SvgIcon from './svg1.vue'
  
  const isHovered = ref(false)

  // Declare the prop
defineProps({
  title: {
    type: String,
  default: 'Learn More'
  },
  link: {
    type: String,
    required: true
  }
})
  </script>

  <style scoped>
/*----Styles for Header Button------------------ */ 
  
  .learn-more {
      position: relative;
      display: flex;
      cursor: pointer;
      outline: none;
      width: 100%;
      border: 0;
      vertical-align: middle;
      text-decoration: none;
      background: transparent;
      padding: 0;
      font-size: inherit;
      font-family: inherit;
      width: auto;
      height: auto;
    }
      
    .learn-more .circle {
      transition: all 0.55s cubic-bezier(0.65, 0, 0.076, 1);
      box-shadow: 0 0 5px 1px white;
      position: absolute;
      display: inline-block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: #202560;
      border-radius: 1.625rem;
    }
    
    .learn-more .circle .icons {
      transition: all 0.55s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
    }
    
    .learn-more .circle .icons.arrows {
      transition: all 0.95s cubic-bezier(0.65, 0, 0.076, 1);
      left: 0.625rem;
      width: 1.2rem;
      margin: 0;
      height: .125rem;
      transform: translate(2px, 12px) rotate(-360deg);
      background: none;
    }
    
    
    .learn-more .button-text {
      transition: all 0.75s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      top: 0;
      left: 0;
      display: flex;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      margin-left: 56px;
      padding: 0.75rem 0;
      color: #fff;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
    
    .learn-more:hover .circle {
      width: 100%;
      background: #fff;
      box-shadow: 0 0 5px 1px black;
      transition: ease .85s cubic-bezier(0.65, 0, 0.076, 1);
    }
    
    .learn-more:hover .button-text {
      transform: translate(-2.7rem, 0);
      color: #000;
    }
    .cls-1 {
      transition: ease .55s;
    }
    .learn-more:hover .cls-1 {
      stroke: #000;
      transition: all .65s;
    }
    .learn-more:hover .circle .icons.arrows {
      left: calc(90% - 15px);
      display: grid;
      transform: translateY(12px) rotate(0deg);
      transition: 1.95s ease;
      position: relative;
    }
    
    .learn-more:active .circle .icons.arrows {
      transform: translate(0.4rem, 16px) rotate(25deg);
      transition: all 0.3s;
    }
    
    .learn-more:active .circle {
      transform: scale(0.9);
      transition: all 0.3s;
      box-shadow: 0 0 5px 0.5px white;
    }
    
    .learn-more:active .button-text {
      color: rgba(255, 255, 255, 0.459);
    }
    
    
    /* Media queries for responsiveness */
    @media screen and (max-width: 768px) {
      .learn-more {
        width: 100%; /* Adjust the width for smaller screens */
      }
    }
      /*----End of Styles for Header Button------------------ */ 

</style>
  
  