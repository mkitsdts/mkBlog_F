import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Article from '@/components/Article.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles/:title',
    name: 'Article',
    component: Article
  }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;