import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView/index') },
    { path: '/play', name: 'play', component: () => import('../views/PlayView/index') },
    { path: '/results', name: 'results', component: () => import('../views/ResultsView/index') },
  ],
});
export default router;
