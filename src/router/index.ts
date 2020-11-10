import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import NewPost from '@/components/NewPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts/new',
    name: 'New post',
    component: NewPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
