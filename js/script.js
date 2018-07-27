let List = {
  template: `<div>
      <h2>{{input}}</h2>
      <br>
      <br>
      <p> 
        <input type="text" v-model.trim="input" @keyup.enter="create">
        <button @click="create">Create</button>
      </p>
      <ol>
        <li v-for="(item, index) in contents" :key="item.id">
          {{ item.content }}
        </li>
      </ol>
    </div>`,
  data: function () {
    return {
      input: '',
      contents: []
    };
  },
  computed: {
    // contents() {
    //   this.contents;
    // }
  },
  methods: {
    create() {
      axios.post('http://localhost:3000/contents', {
        content: this.input
      });
      this.input = ''
    }
  },
  mounted() {
    axios.get('http://localhost:3000/contents')
      .then((res) => {
        console.log(res);
        let data = res.data;
        this.contents = data;
      });
  }
};

let Edit = {
  template: `<div>
      <p>
        <input v-model.trim="input" type="text" />
        <button @click="update">Update</button>
      </p>
    </div>`
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