<script setup>
const user = ref({
  login: 'User123' // В реальном приложении брали бы из авторизации
});

const tasks = ref([
  {
    id: 1,
    title: 'Завершить проект',
    status: 'В работе',
    dueDate: '2023-12-15',
    completed: false
  },
  {
    id: 2,
    title: 'Провести встречу',
    status: 'Просрочена',
    dueDate: '2023-11-30',
    completed: false
  }
]);

const newTask = ref({
  title: '',
  dueDate: ''
});

const createTask = () => {
  if (!newTask.value.title) return;
  
  tasks.value.push({
    id: Date.now(),
    title: newTask.value.title,
    status: 'Новая',
    dueDate: newTask.value.dueDate || 'Без срока',
    completed: false
  });
  
  newTask.value.title = '';
  newTask.value.dueDate = '';
};

const fetchTasks = () => {
  console.log('Запрошены задачи');
};

const completeTask = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = 'Выполнена';
    task.completed = true;
  }
};

const isOverdue = (dueDate) => {
  if (dueDate === 'Без срока') return false;
  return new Date(dueDate) < new Date();
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Шапка -->
      <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <div class="text-lg font-medium text-gray-900">
          Пользователь: {{ user.login }}
        </div>
        <div class="flex space-x-4">
          <button
            @click="createTask"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Создать задачу
          </button>
          <button
            @click="fetchTasks"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Получить задачи
          </button>
        </div>
      </div>

      <!-- Форма создания задачи -->
      <div class="bg-white p-6 rounded-lg shadow mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Создать новую задачу</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Название</label>
            <input
              v-model="newTask.title"
              placeholder="Введите название задачи"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Срок выполнения</label>
            <input
              v-model="newTask.dueDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <!-- Список задач -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Список задач</h3>
        
        <div v-if="tasks.length === 0" class="text-center py-8 text-gray-500">
          Нет задач. Создайте первую!
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="p-4 border rounded-lg"
            :class="{
              'border-red-500 border-l-4': isOverdue(task.dueDate) && !task.completed,
              'bg-gray-50': task.completed,
              'border-gray-200': !isOverdue(task.dueDate) && !task.completed
            }"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
                <p class="text-sm text-gray-500 mt-1">Статус: {{ task.status }}</p>
                <p class="text-sm text-gray-500">Срок: {{ task.dueDate }}</p>
              </div>
              
              <button
                v-if="!isOverdue(task.dueDate) && !task.completed"
                @click="completeTask(task.id)"
                class="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Выполнено
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>