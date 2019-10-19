<template lang="html">
  <div is="sui-container">
    <sui-grid>
      <sui-grid-row>
        <sui-grid-column :width="8">
          <h1>Back-Log</h1>
          <div style="padding: 2rem; border: 1px solid red">
            <Card :tasks="tasks" status="backlog" />
          </div>
        </sui-grid-column>

        <sui-grid-column :width="8">
          <h1>To-Do</h1>
          <div style="padding: 2rem; border: 1px solid red">
            <Card :tasks="tasks" status="todo" />
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import db from '@/config/firestore'
import Card from '@/components/Card'

export default {
  name: 'Home',
  components: {
    draggable,
    Card
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
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
      console.log(newBacklog)
      db.collection('tasks')
    }
  }
}
</script>
