Vue.component("navbar-ku", {
  props: ["islogin", "login", "currUser"],
  template: `
  <nav class="navbar" style="border-bottom: solid 1px #c6c6c6">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="logo-nav.png" alt="logo" width="112" height="28">
      </a>

      <div class="navbar-burger burger" data-target="navMenuExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end" v-if="islogin==false">
        <div class="navbar-item">
          <input class="input" type="text" placeholder="username" v-model="login.username">
        </div>
        <div class="navbar-item">
          <input class="input" type="password" placeholder="password" v-model="login.password" @keyup.enter="loginGoGo">
        </div>
        <div class="navbar-item">
          <p class="control">
            <a class="button is-warning" @click="loginGoGo">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
              <span>Login</span>
            </a>
          </p>
        </div>
      </div>
      <div class="navbar-end" v-else-if="islogin==true">
        <div class="navbar-item">
          <p>Hi, {{ currUser }} </p>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-warning" @click="logoutGoGo()">
                <span>Logout</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>`,
  methods: {
    loginGoGo: function() {
      this.$emit("login-go-go")
    },
    logoutGoGo: function() {
      this.$emit("logout-go-go")
    }
  }
})

Vue.component("signupforms", {
  props: ["signup"],
  template: `
  <div>
    <div class="field">
      <label class="label">Name</label>
      <p class="control">
        <input class="input" type="text" placeholder="Full Name" v-model="signup.name">
      </p>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <p class="control">
        <input class="input" type="text" placeholder="Username" v-model="signup.username">
      </p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <p class="control">
        <input class="input" type="password" placeholder="Password" v-model="signup.password">
      </p>
    </div>
    <div class="field">
      <span>
        <button class="button is-warning" @click="signUpGoGo">Sign Up</button>
      </span>
    </div>
  </div>`,
  methods: {
    signUpGoGo: function() {
      this.$emit("signup-go-go")
    }
  }
})

Vue.component("start-page", {
  props: ["islogin", "loginData", "currUser", "signUpData"],
  template: `
  <div>
    <navbar-ku :islogin="islogin" :login="loginData" :curr-user="currUser" @login-go-go="loginGoGo" @logout-go-go="logoutGoGo"></navbar-ku>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <br>
        <br>
        <h3 class="title">Sign Up Now!</h3>
        <signupforms :signup="signUpData" @signup-go-go="signUpGoGo"></signupforms>
      </div>
    </div>
  </div>
  `,
  methods: {
    loginGoGo: function() {
      this.$emit("login-go-go")
    },
    logoutGoGo: function() {
      this.$emit("logout-go-go")
    },
    signUpGoGo: function() {
      this.$emit("signup-go-go")
    }
  }
})

Vue.component('home-page', {
  props: ["islogin", "loginData", "currUser", "listTodo", "newTodo", "stylenya"],
  template: `
  <div style="overflow: hidden;">
  <navbar-ku  :islogin="islogin"
  :login="loginData"
  :curr-user="currUser"
  @login-go-go="loginGoGo"
  @logout-go-go="logoutGoGo"></navbar-ku>

  <new-todo :new-todo="newTodo" :stylenya="stylenya" @close-create-new="closeCreateNew" @get-todo="getToDo"></new-todo>

  <edit-todo :style="stylenya.editTodo" :new-todo="newTodo" @close-edit-todo="closeEditTodo" @get-todo="getToDo"></edit-todo>

  <button class="button is-primary" :style="stylenya.createNewButton" @click="createNew()">Create New</button>

  <todo-table :list-todo="listTodo" :style="stylenya.createNewButton" :new-todo="newTodo" @edit-todo="editTodo" @get-todo="getToDo"></todo-table>
  </div>`,
  methods: {
    loginGoGo: function() {
      this.$emit("login-go-go")
    },
    logoutGoGo: function() {
      this.$emit("logout-go-go")
    },
    createNew: function() {
      this.$emit('create-new')
    },
    closeCreateNew: function() {
      this.$emit("close-create-new")
    },
    getToDo: function() {
      this.$emit("get-todo")
    },
    editTodo: function() {
      this.stylenya.createNewButton.display = "none"
      this.stylenya.editTodo.display = "block"
    },
    closeEditTodo: function() {
      this.stylenya.createNewButton.display = "block"
      this.stylenya.editTodo.display = "none"
      this.newTodo.title = ""
      this.newTodo.desc = ""
      this.newTodo._id = ""
    }
  }
})

Vue.component('todo-table', {
  props: ["listTodo", "newTodo"],
  data: function() {
    return {
      sortDone: true,
      sortDateTarget: true,
      sortCreatedAt: true,
      sortTitle: true
    }
  },
  template: `
  <div style="padding: 30px;">
    <br>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>No</th>
          <th v-if="sortTitle" @click="sortByTitle(sortTitle)"><a>Title</a></th>
          <th v-else @click="sortByTitle(sortTitle)"><a>Title</a></th>
          <th>Desc</th>
          <th v-if="sortCreatedAt" @click="sortByCreatedAt(sortCreatedAt)"><a>Created At</a></th>
          <th v-else @click="sortByCreatedAt(sortCreatedAt)"><a>Created At</a></th>
          <th v-if="sortDateTarget" @click="sortByDateTarget(sortDateTarget)"><a>Date Target</a></th>
          <th v-else @click="sortByDateTarget(sortDateTarget)"><a>Date Target</a></th>
          <th v-if="sortDone" @click="sortByDone"><a>Done?</a></th>
          <th v-else @click="sortByDoneReverse"><a>Done?</a></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in listTodo">
          <td> {{ index+1 }} </td>

          <td v-if="todo.isDone"> <strike>{{ todo.title }}</strike> </td>
          <th v-else> {{todo.title}} </th>

          <td v-if="todo.isDone"> <strike>{{ todo.desc }}</strike> </td>
          <td v-else> {{ todo.desc }} </td>

          <td v-if="todo.isDone"> <strike>{{ todo.createdAt }}</strike> </td>
          <td v-else> {{todo.createdAt}} </td>

          <td v-if="todo.isDone"> <strike>{{ todo.doneTarget }}</strike> </td>
          <td v-else> {{ todo.doneTarget }} </td>

          <td> <a @click="changeIsDone(todo)">{{ todo.isDone }}</a> </td>
          <td><a @click="editTodo(todo)">Edit</a> &nbsp <a style="color: grey" @click="deleteTodo(todo)">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>`,
  methods: {
    deleteTodo: function(obj) {
      let self = this
      if (confirm(`Are you sure want to delete "${obj.title}"?`)) {
        axios.delete(`http://localhost:3000/todos/${obj._id}`)
        .then(function(response) {
          self.$emit('get-todo')
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    },
    editTodo: function(obj) {
      this.newTodo._id = obj._id
      this.newTodo.title = obj.title
      this.newTodo.desc = obj.desc
      this.newTodo.doneTarget = obj.doneTarget
      this.newTodo.isDone = obj.isDone
      this.$emit("edit-todo")
    },
    changeIsDone: function(obj) {
      let self= this
      if (obj.isDone == false) {
        axios.put(`http://localhost:3000/todos/${obj._id}`, {
          title: obj.title,
          desc: obj.desc,
          isDone: true,
          doneDate: obj.doneTarget
        })
        .then(function(response) {
          self.$emit("get-todo")
        })
        .catch(function(err) {
          console.log(err);
        })
      } else {
        axios.put(`http://localhost:3000/todos/${obj._id}`, {
          title: obj.title,
          desc: obj.desc,
          isDone: false,
          doneDate: obj.doneTarget
        })
        .then(function(response) {
          self.$emit("get-todo")
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    },
    sortByDone: function() {
      this.listTodo.sort(function(a,b) {
        return a.isDone - b.isDone
      })
      this.sortDone = false
    },
    sortByDoneReverse: function() {
      this.listTodo.sort(function(a,b) {
        return b.isDone - a.isDone
      })
      this.sortDone = true
    },
    sortByDateTarget: function(bool) {
      if (bool) {
        this.listTodo.sort(function(a, b) {
          return new Date(a.doneTarget).getTime() - new Date(b.doneTarget).getTime()
        })
        this.sortDateTarget = false
      } else {
        this.listTodo.sort(function(a, b) {
          return new Date(b.doneTarget).getTime() - new Date(a.doneTarget).getTime()
        })
        this.sortDateTarget = true
      }
    },
    sortByCreatedAt: function(bool) {
      if (bool) {
        this.listTodo.sort(function(a, b) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })
        this.sortCreatedAt = false
      } else {
        this.listTodo.sort(function(a, b) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        this.sortCreatedAt = true
      }
    },
    sortByTitle: function(bool) {
      if (bool) {
        console.log("sortTitle = true");
        this.listTodo.sort(function(a, b) {
          if (a.title > b.title) {
            return 1
          } else  if (a.title < b.title) {
            return -1
          }
          return 0
        })
        this.sortTitle = false
      } else {
        console.log("sortTitle = false");
        this.listTodo.sort(function(a, b) {
          if (a.title > b.title) {
            return -1
          } else  if (a.title < b.title) {
            return 1
          }
          return 0
        })
        this.sortTitle = true
      }
    }
  }
})

Vue.component('new-todo', {
  props: ["newTodo", "stylenya"],
  template: `
  <div :style="stylenya.newTodo">
    <div class="field column is-one-third is-offset-one-third">
      <label class="label">New Todo</label>
      <input type="text" class="input" placeholder="Title" v-model="newTodo.title">
    </div>
    <div class="field column is-one-third is-offset-one-third">
      <textarea type="text" class="textarea" placeholder="Description" v-model="newTodo.desc"></textarea>
    </div>
    <div class="field column is-one-third is-offset-one-third">
      <label class="label">Done Target : {{ newTodo.doneTarget }} </label>
      <input type="datetime-local" class="input" v-model="newTodo.doneTarget">
    </div>
    <div class="field column is-one-third is-offset-one-third is-grouped">
      <a class="button is-primary" @click="createNewGoGo()">Create</a>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <a class="button is-warning" @click="closeNewTodo()">Cancel</a>
    </div>
  </div>`,
  methods: {
    closeNewTodo: function() {
      this.$emit("close-create-new")
    },
    getToDo: function() {
      this.$emit("get-todo")
    },
    createNewGoGo: function() {
      let self = this
      axios.post("http://localhost:3000/users/verify-token", {
        token: localStorage.token
      })
      .then(function(response) {
        axios.post("http://localhost:3000/todos", {
          title: self.newTodo.title,
          desc: self.newTodo.desc,
          userId: response.data.userId,
          doneDate: self.newTodo.doneTarget
        })
        .then(function(rezponse) {
          self.closeNewTodo()
          self.getToDo()
        })
        .catch(function(err) {
          console.log(err);
        })
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }
})

Vue.component('edit-todo', {
  props: ["stylenya", "newTodo"],
  template: `
  <div>
    <div class="field column is-one-third is-offset-one-third">
      <label class="label">Edit Todo</label>
      <input type="text" class="input" placeholder="Title" v-model="newTodo.title">
    </div>
    <div class="field column is-one-third is-offset-one-third">
      <textarea type="text" class="textarea" placeholder="Description" v-model="newTodo.desc"></textarea>
    </div>
    <div class="field column is-one-third is-offset-one-third">
      <label class="label">Done Target : {{ newTodo.doneTarget }} </label>
      <input type="datetime-local" class="input" v-model="newTodo.doneTarget">
    </div>
    <div class="field column is-one-third is-offset-one-third is-grouped">
      <a class="button is-primary" @click="editGoGo()">Update</a>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <a class="button is-warning" @click="closeEditTodo()">Cancel</a>
    </div>
  </div>`,
  methods: {
    editGoGo: function() {
      let self = this
      axios.put(`http://localhost:3000/todos/${this.newTodo._id}`, {
        title: self.newTodo.title,
        desc: self.newTodo.desc,
        isDone: self.newTodo.isDone,
        doneDate: self.newTodo.doneTarget
      })
      .then(function(response) {
        self.closeEditTodo()
        self.$emit('get-todo')
      })
      .catch(function(err) {
        console.log(err);
      })
    },
    closeEditTodo: function() {
      this.$emit("close-edit-todo")
    }
  }
})
