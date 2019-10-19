<template lang="html">
  <div>
    <draggable
      v-model="tasks[status]"
      group="tasks"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template>
        <sui-card v-for="task in tasks[status]" :key="task.id">
          <sui-card-content>
            <sui-card-header>
              {{ task.name }}
            </sui-card-header>
          </sui-card-content>
          <sui-card-content>
            <sui-header v-if="task.tags" size="tiny">
              <div v-for="(tag, i) in task.tags" size="mini" :key="i" is="sui-label" tag>
                {{ tag }}
              </div>
            </sui-header>
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
            <sui-button>Join Project</sui-button>
          </sui-card-content>
        </sui-card>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Card',
  components: {
    draggable
  },
  props: ['tasks', 'status'],
  data() {
    return {
      isDragging: false,
      delayedDragging: false
    }
  },
  methods: {}
}
</script>
