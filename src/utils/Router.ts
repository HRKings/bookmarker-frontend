import { createRouter, createWebHashHistory } from 'vue-router';

import ListCategory from '@/views/ListCategory.vue';
import SearchBookmarks from '@/views/SearchBookmarks.vue';

const routes = [
  { path: '/', component: ListCategory },
  { path: '/search', component: SearchBookmarks },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
