<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserHeader :user="user">
        <button
          @click="fetchTasks"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Обновление...' : 'Обновить задачи' }}
        </button>
      </UserHeader>

      <!-- Сообщение об ошибке -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>

      <TaskForm 
        @create="createTask"
        :isLoading="isLoading"
      />

      <TaskList 
        :tasks="tasks"
        :isLoading="isLoading"
        @complete="completeTask"
      />
    </div>
  </div>
</template>

<script setup>
const user = ref({
  login: 'User123'
})

const tasks = ref([])
const isLoading = ref(false)
const error = ref(null)

const API_URL = 'http://localhost:3001/api'

const fetchTasks = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Ошибка загрузки задач')
    tasks.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Ошибка:', err)
  } finally {
    isLoading.value = false
  }
}

const createTask = async (taskData) => {
  if (!taskData.title) return
  
  isLoading.value = true
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskData.title,
        deadline: taskData.dueDate || null,
        status: 'new'
      })
    })
    
    if (!response.ok) throw new Error('Ошибка создания задачи')
    
    const createdTask = await response.json()
    tasks.value.push(createdTask)
  } catch (err) {
    error.value = err.message
    console.error('Ошибка:', err)
  } finally {
    isLoading.value = false
  }
}

const completeTask = async (taskId) => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_URL}/${taskId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'completed'
      })
    })
    
    if (!response.ok) throw new Error('Ошибка обновления задачи')
    
    const updatedTask = await response.json()
    const index = tasks.value.findIndex(t => t._id === taskId)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  } catch (err) {
    error.value = err.message
    console.error('Ошибка:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>