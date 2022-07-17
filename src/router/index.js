import { createRouter, createWebHistory } from '@ionic/vue-router';
import BooksPage from '@/views/BooksPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksPage,
  },
  {
    path: '/goals',
    name: 'Goals',
    component: () => import('@/views/GoalsPage.vue'),
  },
  {
    path: '/reading',
    name: 'Reading',
    component: () => import('@/views/ReadingPage.vue'),
  },
  {
    path: '/lending',
    name: 'Lending',
    component: () => import('@/views/LendingPage.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/books',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
