import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'mainLayout',
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
        name: 'login',
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        name: 'LoginPage',
      },
      {
        path: 'quiz',
        component: () => import('pages/QuizPage.vue'),
        name: 'QuizPage',
      },
      {
        path: 'end',
        component: () => import('pages/EndPage.vue'),
        name: 'EndPage',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
