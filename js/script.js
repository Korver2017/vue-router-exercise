let router = new VueRouter({
  routes: [{
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/update/:id',
      name: 'update',
      component: Edit
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

new Vue({
  el: '#app',
  router,

});