import Vue from "vue";
import VueRouter, { Route } from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home/Home.vue")
  },
  {
    path: "/sort",
    name: "sort",
    component: ()=>import("../views/Sort/Sort.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: ()=>import("../views/Cart/Cart.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: ()=>import("../views/Profile/Profile.vue")
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: ()=>import("../views/GoodsDetail/GoodsDetail.vue")
  },
  {
    path: "/login",
    name: "login",
    component: ()=>import("../views/Login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: ()=>import("../views/Register/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: Route, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
  // console.log("路由守卫");
  next();
});

export default router;
