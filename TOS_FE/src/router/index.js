// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Event from "@/views/Event.vue";
import LoginPage from "@/views/LoginPage.vue";
import Information from "@/views/Information.vue";
import TicketDetail from "@/views/TicketDetail.vue";
import CartPage from '@/views/CartPage.vue';
import OrderPage from '@/views/OrderPage.vue';

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
    path: '/ticket/:id',
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
    path: '/order',
    name: 'Order',
    component: OrderPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
 

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
