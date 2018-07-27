let List = {
  template: `
    <div>
      <p>
        <input type="text" v-model.trim="input">
        <button @click="create"></button>
      </p>
      <ol>
        <li v-for="(item, index) in contents" :key="item.id">
          {{ item.content }}
        </li>
      </ol>
    </div>`
};

let Edit = {

}

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