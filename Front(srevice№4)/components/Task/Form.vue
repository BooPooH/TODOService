<template>
  <div class="bg-white p-6 rounded-lg shadow mb-8">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Создать новую задачу</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Название</label>
        <input
          v-model="newTask.title"
          :disabled="isLoading"
          placeholder="Введите название задачи"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Срок выполнения</label>
        <input
          v-model="newTask.dueDate"
          :disabled="isLoading"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
        />
      </div>
    </div>
    <button
      @click="emit('create', newTask)"
      :disabled="isLoading"
      class="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isLoading ? 'Создание...' : 'Создать задачу' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['create'])

const newTask = ref({
  title: '',
  dueDate: ''
})

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>