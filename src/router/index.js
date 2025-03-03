import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import FriendLinks from '@/components/FriendLinks.vue';
import About from '@/components/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/friend-links',
    name: 'FriendLinks',
    component: FriendLinks
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;