import { createRouter, createWebHistory } from 'vue-router';
import { publicRoutes } from '~/router/public';
import { privateRoutes } from '~/router/private';
import VueCookie from 'vue-cookie';

const router = createRouter({
  history: createWebHistory(),
  routes: privateRoutes.concat(publicRoutes),
});

router.beforeEach(async (to, from, next) => {
  document.title = 'Gulchitay' + (to?.meta?.title ? ' - ' + to.meta.title : '');
  const loggedIn = VueCookie.get('auth');
  if (!loggedIn && to.name !== 'auth.login') next({ name: 'auth.login' });
  else if (to.matched.some(record => record.meta.public) && loggedIn) {
    next({ name: 'personalData' });
  } else {
    next();
  }
});

export default router;
