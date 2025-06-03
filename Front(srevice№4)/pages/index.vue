<script setup>
  const goToTasks = () => {
    navigateTo('/taskpage');
  };
  const showAdvanced = ref(false);
  const form = ref({
    login: '',
    password: ''
  });

  const toggleAdvanced = () => {
    showAdvanced.value = !showAdvanced.value;
  };

  const submitForm = () => {
    // Здесь можно добавить логику отправки формы
    console.log('Форма отправлена:', form.value);
  };
</script>

<template>
   <div class="login-container">
    <h1 v-if="!showAdvanced">Вход в систему</h1>
    <h1 v-else>Регистрация</h1>
    
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-group">
        <label for="login">Логин:</label>
        <input 
          id="login" 
          v-model="form.login" 
          type="text" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          required
        />
      </div>

      
      <div class="buttons">
        <button 
          type="button" 
          @click="toggleAdvanced"
          class="toggle-btn"
        >
          {{ showAdvanced ? 'Вход в систему' : 'Регистрация' }}
        </button>
        

          <button @click="goToTasks" type="submit" class="submit-btn">
            {{ showAdvanced ? 'Зарегистрироваться' : 'Войти' }}
          </button>

      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  
  /* Скрываем контейнер на экранах меньше 1024px */
  display: none;
}

  /* Показываем контейнер только на экранах от 1024px */
@media (min-width: 1024px) {
  .login-container {
    display: flex;
  }
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.toggle-btn {
  background-color: #f0f0f0;
  color: #333;
}

.submit-btn {
  background-color: #42b983;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>