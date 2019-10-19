<template>
  <div class="ui secondary menu">
    <sui-modal v-model="isOpenAddTask">
      <sui-modal-header>New a new issue</sui-modal-header>
      <sui-modal-content>
        <sui-message v-if="error.length" negative header="Ouch!" :list="error" />
        <sui-form @submit.prevent="handleAddTask">
          <sui-form-field required>
            <label>Issue title</label>
            <input v-model="name" required placeholder="Title of new issue" />
          </sui-form-field>
          <sui-form-field required>
            <label>Issue description</label>
            <input v-model="description" required placeholder="Description of new issue" />
          </sui-form-field>
          <sui-form-field>
            <label>Labels</label>
            <sui-dropdown
              fluid
              multiple
              :options="labels"
              placeholder="Label issue"
              search
              selection
              v-model="tags"
            />
          </sui-form-field>
          <sui-button :loading="loadingBtn" :disabled="disabledBtn" positive type="submit">
            Submit new issue
          </sui-button>
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
        <sui-button @click.native="openAddTask">New Issue</sui-button>
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
      tags: '',
      email: '',
      password: '',
      error: [],
      disabled: true,
      labels: [
        { key: 'bug', text: 'Bug', value: { value: 'bug', color: 'red' } },
        { key: 'enhancement', text: 'Enhancement', value: { value: 'enhancement', color: 'teal' } },
        {
          key: 'good first issue',
          text: 'Good first issue',
          value: {
            value: 'good first issue',
            color: 'violet'
          }
        },
        {
          key: 'help wanted',
          text: 'Help wanted',
          value: { value: 'help wanted', color: 'green' }
        },
        { key: 'question', text: 'Question', value: { value: 'question', color: 'pink' } },
        { key: 'wontfix', text: 'Wontfix', value: { value: 'wontfix', color: 'yellow' } },
        { key: 'duplicate', text: 'Duplicate', value: { value: 'duplicate', color: 'grey' } },
        { key: 'invalid', text: 'Invalid', value: { value: 'invalid', color: 'brown' } }
      ]
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
      this.loadingBtn = true
      this.error = []
      db.collection('tasks')
        .add({
          name: this.name,
          description: this.description,
          tags: this.tags,
          status: 'backlog'
        })
        .then(docRef => {
          console.log(docRef)
          console.log('Document written with ID: ', docRef.id)
          this.isOpenAddTask = false
          this.loadingBtn = false
          this.name = ''
          this.description = ''
          this.tags = ''
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
