import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MyComponent from "./components/MyComponent.vue";
import Footer from "./components/Footer.vue";

const app = createApp(App)
app.use(store)
app.use(router)

app.component('my-component', MyComponent)
app.component('app-footer', Footer)

app.mount("#app");
