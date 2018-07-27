let List = {
  template: `<div>
      <p>{{input}}</p>
      <p> 
        <input type="text" v-model.trim="input" @keyup.enter="create">
        <button @click="create">Create</button>
      </p>
      <ol>
        <li v-for="(item, index) in contents" :key="item.id">
          {{ item.content }}   <button @click="remove(index)">Delete</button>
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
      }).then(res => {
        this.input = '';
        // console.log(res.data);
        this.contents.push(res.data);
      })
    },
    remove(index) {
      // console.log(index);
      let target = this.contents[index];
      axios.delete(`http://localhost:3000/contents/${target.id}`)
        .then(res => {
          // console.log(res);
          this.contents.splice(index, 1);
        });
    },
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