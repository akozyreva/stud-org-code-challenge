import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ShipPage from './views/ShipPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'ShipPage',
      component: ShipPage,
    },
  ],
});
