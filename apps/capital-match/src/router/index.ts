import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/play', name: 'play', component: () => import('../views/PlayView.vue') },
    { path: '/results', name: 'results', component: () => import('../views/ResultsView.vue') },
  ],
});
export default router;
