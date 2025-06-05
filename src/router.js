import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import Events from '@/pages/Events.vue'
import OurChurch from '@/pages/Our-church.vue'
import Sermons from '@/pages/Sermons.vue'
import Donate from '@/pages/Donate.vue'
import ContactUs from '@/pages/Contact-us.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: News, name: 'News' },
  { path: '/Events', component: Events, name: 'Events' },
  { path: '/our-church', component: OurChurch, name: 'OurChurch' },
  { path: '/sermons', component: Sermons, name: 'Sermons' },
  { path: '/donate', component: Donate, name: 'Donate' },
  { path: '/contact-us', component: ContactUs, name: 'Contact-us' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router