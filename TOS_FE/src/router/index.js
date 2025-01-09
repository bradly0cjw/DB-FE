import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Event from "@/views/Event.vue";
import LoginPage from "@/views/LoginPage.vue";
import Information from "@/views/Information.vue";
import TicketDetail from "@/views/TicketDetail.vue";
import CartPage from '@/views/CartPage.vue';
import OrderPage from '@/views/OrderPage.vue';
import Search from "@/views/Search.vue";
import Dashboard from '@/views/Dashboard.vue';
import Register from '@/views/Register.vue';
import Admin from '@/views/Admin.vue';
import userState from "@/data/user.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/event",
    name: "Event",
    component: Event,
  },
  {
    path: '/event/:id',
    name: 'TicketDetail',
    component: TicketDetail,
  },
  {
    path: "/information",
    name: "Information",
    component: Information,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/orders',
    name: 'OrderPage',
    component: OrderPage,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: "/seller/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresSeller: true }, 
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAdmin)) {
//     if (!userState.isLoggedIn || !userState.isAdmin) {
//       next({ name: 'LoginPage' });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresSeller)) {
//     if (!userState.isLoggedIn || !userState.isSeller) {
//       next({ name: 'LoginPage' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
