import { createApp} from 'vue';
import App from './App.vue';
import router from './router';


const app = createApp(App);

router.afterEach(() => {
  // Delay slightly to ensure DOM is updated
  setTimeout(() => {
    // Re-run your JS here (e.g., animations, libraries)
    window.Webflow?.require('ix2').init(); // if using Webflow interactions
    // Or manually trigger animations/scroll
  })
})

app.use(router); // Plugin: Add Vue Router to your app
app.mount('#app');  // Mount to <div


