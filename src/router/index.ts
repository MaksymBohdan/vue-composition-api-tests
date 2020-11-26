import { store } from './../store';
import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import NewPost from '@/components/NewPost.vue';
import ShowPost from '@/components/ShowPost.vue';
import EditPost from '@/components/EditPost.vue';

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
    meta: { requiresAuth: true },
  },
  {
    name: 'ShowPost',
    path: '/posts/:id',
    component: ShowPost,
  },
  {
    name: 'EditPost',
    path: '/posts/:id/edit',
    component: EditPost,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const makeRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
    next({
      name: 'Home',
    });
  } else {
    next();
  }
});

export default router;
