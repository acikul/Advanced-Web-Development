import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue"
import OneWayBinding from "../views/OneWayBinding.vue"
import TwoWayBinding from "../views/TwoWayBinding.vue"
import Lifecycle from "../views/Lifecycle.vue"
import MyView from "../views/MyView.vue"
import Store from "../views/Store.vue"
import AxiosAsync from "../views/AxiosAsync.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/1-way-binding",
    name: "1 Way Binding",
    component: OneWayBinding,
  },
  {
    path: "/calc",
    name: "2 Way Binding",
    component: TwoWayBinding,
  },
  {
    path: "/lifecycle",
    name: "2Lifecycle",
    component: Lifecycle,
  },
  {
    path: "/component-emit",
    name: "Custom Component",
    component: MyView,
  },
  {
    path: "/store",
    name: "Store Footer Message",
    component: Store,
  },
  {
    path: "/async",
    name: "Kanye Rest",
    component: AxiosAsync,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
