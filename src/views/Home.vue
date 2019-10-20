<template lang="html">
  <sui-container fluid>
    <sui-grid style="margin: 0 12rem">
      <sui-grid-row>
        <sui-grid-column :width="4">
          <sui-card style="width: 100%">
            <sui-card-content>
              <sui-card-header>
                <h1>Back-Log</h1>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content>
              <div style="padding: 1rem">
                <Card :tasks="tasks" status="backlog" color="orange" />
              </div>
            </sui-card-content>
          </sui-card>
        </sui-grid-column>

        <sui-grid-column :width="4">
          <sui-card style="width: 100%">
            <sui-card-content>
              <sui-card-header>
                <h1>To-Do</h1>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content>
              <div style="padding: 1rem">
                <Card :tasks="tasks" status="todo" color="blue" />
              </div>
            </sui-card-content>
          </sui-card>
        </sui-grid-column>

        <sui-grid-column :width="4">
          <sui-card style="width: 100%">
            <sui-card-content>
              <sui-card-header>
                <h1>Doing</h1>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content>
              <div style="padding: 1rem">
                <Card :tasks="tasks" status="doing" color="pink" />
              </div>
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
        <sui-grid-column :width="4">
          <sui-card style="width: 100%">
            <sui-card-content>
              <sui-card-header>
                <h1>Done</h1>
              </sui-card-header>
            </sui-card-content>
            <sui-card-content>
              <div style="padding: 1rem">
                <Card :tasks="tasks" status="done" color="green" />
              </div>
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </sui-container>
</template>

<script>
import db from '@/config/firestore'
import Card from '@/components/Card'

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      isLogin: false,
      tasks: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  methods: {
    fetchTasks() {
      db.collection('tasks').onSnapshot(qS => {
        const tempBacklog = []
        const tempTodo = []
        const tempDoing = []
        const tempDone = []
        qS.forEach(doc => {
          const task = doc.data()
          if (task.status === 'backlog') {
            tempBacklog.push({ ...task, id: doc.id })
          } else if (task.status === 'todo') {
            tempTodo.push({ ...task, id: doc.id })
          } else if (task.status === 'doing') {
            tempDoing.push({ ...task, id: doc.id })
          } else if (task.status === 'done') {
            tempDone.push({ ...task, id: doc.id })
          }
        })

        this.tasks.backlog = tempBacklog
        this.tasks.todo = tempTodo
        this.tasks.doing = tempDoing
        this.tasks.done = tempDone
      })
    }
  },
  mounted() {
    if (this.updateTasks) {
      this.fetchTasks()
    } else {
      this.fetchTasks()
    }
  },
  watch: {
    'tasks.backlog': function(next, prev) {
      const newBacklog = next.filter(data => data.status !== 'backlog')
      if (newBacklog.length) {
        db.collection('tasks')
          .doc(newBacklog[0].id)
          .update({
            status: 'backlog'
          })
          .then(_ => {})
          .catch(err => {
            console.log(err)
          })
      }
    },
    'tasks.todo': function(next, prev) {
      const newTodo = next.filter(data => data.status !== 'todo')
      if (newTodo.length) {
        db.collection('tasks')
          .doc(newTodo[0].id)
          .update({
            status: 'todo'
          })
          .then(_ => {})
          .catch(err => {
            console.log(err)
          })
      }
    },
    'tasks.doing': function(next, prev) {
      const newDoing = next.filter(data => data.status !== 'doing')
      if (newDoing.length) {
        db.collection('tasks')
          .doc(newDoing[0].id)
          .update({
            status: 'doing'
          })
          .then(_ => {})
          .catch(err => {
            console.log(err)
          })
      }
    },
    'tasks.done': function(next, prev) {
      const newDone = next.filter(data => data.status !== 'done')
      if (newDone.length) {
        db.collection('tasks')
          .doc(newDone[0].id)
          .update({
            status: 'done'
          })
          .then(_ => {})
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
