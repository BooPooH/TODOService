<template>
  <div
    class="p-4 border rounded-lg"
    :class="{
      'border-red-500 border-l-4': isOverdue && !task.completed,
      'bg-gray-50': task.completed,
      'border-gray-200': !isOverdue && !task.completed
    }"
  >
    <div class="flex justify-between items-start">
      <div>
        <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
        
        <!-- Добавлено описание задачи -->
        <p v-if="task.description" class="text-sm text-gray-600 mt-1">
          {{ task.description }}
        </p>
        
        <div class="mt-2 space-y-1">
          <p class="text-sm text-gray-500">Статус: {{ task.status }}</p>
          <p class="text-sm text-gray-500">Срок: {{ formattedDate }}</p>
        </div>
      </div>
      
      <button
        v-if="!isOverdue && !task.completed"
        @click="emit('complete', task._id)"
        :disabled="isLoading"
        class="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {{ isLoading ? 'Сохранение...' : 'Выполнено' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['complete'])

const isOverdue = computed(() => {
  if (!props.task.deadline) return false
  const deadline = new Date(props.task.deadline)
  const now = new Date()
  return deadline < now
})

const formattedDate = computed(() => {
  if (!props.task.deadline) return 'Нет срока'
  return new Date(props.task.deadline).toLocaleDateString()
})
</script>