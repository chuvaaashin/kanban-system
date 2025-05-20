<script setup lang="ts">
useHead({
  title: 'Настройки - Kanban System'
})
const passwordRef = ref('')
const auth = useAuthStore()

const changePassword = async () => {
  const { data, error } = await useFetch('/api/settings', {
    method: 'POST',
    body: {
      login: auth.user.login,
      password: passwordRef.value
    }
  })

  if (error.value) {
    alert('Ошибка при смене пароля')
  } else {
    alert('Пароль успешно обновлён')
    passwordRef.value = ''
  }
}

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Настройки</h1>
    <div class="mb-10">
      <h2 class="font-bold text-1xl mb-3">Настройки темы</h2>
      <UiButton
          class="bg-gray-300 text-black mr-10"
      >Светлая тема
      </UiButton>
      <UiButton
          class="bg-gray-800 mr-10"
      >Темная тема
      </UiButton>
      <UiButton
      >Фиолетовая тема
      </UiButton>
    </div>
    <div>
      <h2 class="font-bold text-1xl mb-3">Настройки безопасности</h2>
      <div class="w-1/4">
        <UiInput
        placeholder="Введите новый пароль"
        type="text"
        v-model="passwordRef"
        class="mb-3"
        ></UiInput>
        <UiButton
        class="w-56 bg-purple-700"
        type="button"
        @click="changePassword"
        >
          Сменить пароль
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>