<template>
  <div class="ui secondary menu">
    <sui-modal v-model="isOpenAddTask">
      <sui-modal-header>Add Task</sui-modal-header>
      <sui-modal-content>
        <sui-message v-if="error.length" negative header="Ouch!" :list="error" />
        <sui-form @submit.prevent="handleAddTask">
          <sui-form-field>
            <label>Task Name</label>
            <input v-model="name" placeholder="Task Name" />
          </sui-form-field>
          <sui-form-field>
            <label>Description</label>
            <input v-model="description" placeholder="Task Description" />
          </sui-form-field>
          <sui-form-field>
            <label>Priority</label>
            <input v-model="priority" placeholder="Priority" />
          </sui-form-field>
          <sui-button :loading="loadingBtn" :disabled="disabledBtn" positive type="submit"
            >Add Task</sui-button
          >
        </sui-form>
      </sui-modal-content>
    </sui-modal>

    <sui-modal v-model="isOpenRegister">
      <sui-modal-header>Register to Trillo</sui-modal-header>
      <sui-modal-content>
        <sui-message v-if="error.length" negative header="Ouch!" :list="error" />
        <sui-form @submit.prevent="handleRegister">
          <sui-form-field>
            <label>Email</label>
            <input v-model="email" placeholder="Email" />
          </sui-form-field>
          <sui-form-field>
            <label>Password</label>
            <input v-model="password" placeholder="Password" />
          </sui-form-field>
          <sui-form-field>
            <sui-checkbox label="I agree to the Terms and Conditions" />
          </sui-form-field>
          <sui-button :loading="loadingBtn" positive type="submit">Register</sui-button>
        </sui-form>
      </sui-modal-content>
    </sui-modal>

    <sui-modal v-model="isOpenLogin">
      <sui-modal-header>Login to Trillo</sui-modal-header>
      <sui-modal-content>
        <sui-message v-if="error.length" negative header="Ouch!" :list="error" />
        <sui-form @submit.prevent="handleLogin">
          <sui-form-field>
            <label>Email</label>
            <input v-model="email" placeholder="Email" />
          </sui-form-field>
          <sui-form-field>
            <label>Password</label>
            <input v-model="password" placeholder="Password" />
          </sui-form-field>
          <sui-button :loading="loadingBtn" positive type="submit">Login</sui-button>
        </sui-form>
      </sui-modal-content>
    </sui-modal>
    <div class="item">
      <router-link to="/">Home</router-link>
    </div>
    <div class="right menu">
      <div class="item">
        <div class="ui icon input">
          <input type="text" placeholder="Search..." />
          <i class="search link icon"></i>
        </div>
      </div>
      <div class="item">
        <sui-button @click.native="openAddTask">Add Task</sui-button>
      </div>
      <div class="item">
        <sui-button @click.native="openLogin">Login</sui-button>
      </div>
      <div class="item">
        <sui-button @click.native="openRegister">Register</sui-button>
      </div>
      <a class="ui item">
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import firebase from '@/config/firebase'
import db from '@/config/firestore'

export default {
  name: 'Navbar',
  data() {
    return {
      loadingBtn: false,
      isOpenRegister: false,
      isOpenLogin: false,
      isOpenAddTask: false,
      name: '',
      description: '',
      priority: '',
      email: '',
      password: '',
      error: [],
      disabled: true
    }
  },
  computed: {
    disabledBtn() {
      if (this.name || this.description || this.priority) {
        return false
      }
    }
  },
  methods: {
    openAddTask() {
      this.isOpenAddTask = true
    },
    openRegister() {
      this.isOpenRegister = true
      this.isOpenLogin = false
    },
    openLogin() {
      this.isOpenLogin = true
      this.isOpenRegister = false
    },
    handleAddTask() {
      db.collection('tasks')
        .add({
          name: this.name,
          description: this.description,
          priority: this.priority,
          status: 'backlog'
        })
        .then(function(docRef) {
          console.log(docRef)
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    },
    handleRegister() {
      this.loadingBtn = true
      this.error = []
      console.log(firebase.auth())
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(_ => {
          this.loadingBtn = false
          this.email = ''
          this.password = ''
          console.log('created user')
        })
        .catch(err => {
          this.loadingBtn = false
          this.email = ''
          this.password = ''
          this.error.push(err.message)
          console.log(err)
        })
    },
    handleLogin() {
      this.loadingBtn = true
      this.error = []
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
          this.loadingBtn = false
          this.email = ''
          this.password = ''
          console.log('login user')
        })
        .catch(err => {
          this.loadingBtn = false
          this.email = ''
          this.password = ''
          this.error.push(err.message)
          console.log(err)
        })
    }
  }
}
</script>
