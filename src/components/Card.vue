<template lang="html">
  <div>
    <draggable
      v-model="tasks[status]"
      group="tasks"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template>
        <sui-card v-for="task in tasks[status]" :class="color" :key="task.id">
          <sui-modal v-model="open" size="tiny">
            <sui-modal-header>Delete an issue</sui-modal-header>
            <sui-modal-content>
              <sui-modal-description>
                <p>Are you sure want to delete this issue?</p>
              </sui-modal-description>
            </sui-modal-content>
            <sui-modal-actions>
              <sui-button negative @click.native="deleteIssue(task.id)">
                Yes, Delete it
              </sui-button>
            </sui-modal-actions>
          </sui-modal>

          <sui-card-content>
            <sui-card-header>
              <h1>
                {{ task.name }}
                <sui-button
                  icon="trash"
                  floated="right"
                  size="tiny"
                  @click.native="toggle"
                ></sui-button>
              </h1>
            </sui-card-header>
          </sui-card-content>
          <sui-card-content>
            <div class="ui small feed">
              <div class="event">
                <div class="content">
                  <div class="summary">
                    {{ task.description }}
                  </div>
                </div>
              </div>
            </div>
            <!-- end of base semantic ui, to be updated in the future with sui-feed -->
          </sui-card-content>
          <sui-card-content extra>
            <div
              v-if="task.tags.length"
              v-for="(tag, i) in task.tags"
              :color="tag.color"
              size="small"
              :key="i"
              is="sui-label"
              style="margin: 3px"
            >
              <div>
                {{ tag.value }}
              </div>
            </div>
          </sui-card-content>
        </sui-card>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import db from '@/config/firestore'

export default {
  name: 'Card',
  components: {
    draggable
  },
  props: ['tasks', 'status', 'color'],
  data() {
    return {
      isDragging: false,
      delayedDragging: false,
      open: false
    }
  },
  methods: {
    deleteIssue(id) {
      db.collection('tasks')
        .doc(id)
        .delete()
        .then(_ => {})
        .catch(err => console.log(err))
    },
    toggle() {
      this.open = !this.open
    }
  }
}
</script>
