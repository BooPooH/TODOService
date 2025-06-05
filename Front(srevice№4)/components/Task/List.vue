<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Список задач</h3>
      <span v-if="isLoading" class="text-sm text-gray-500">Загрузка...</span>
    </div>
    
    <div v-if="isLoading && tasks.length === 0" class="text-center py-8 text-gray-500">
      Загрузка задач...
    </div>

    <div v-else-if="tasks.length === 0" class="text-center py-8 text-gray-500">
      Нет задач. Создайте первую!
    </div>
    
    <div v-else class="space-y-4">
      <TaskItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        :isLoading="isLoading"
        @complete="emit('complete', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './Item.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['complete'])
</script>