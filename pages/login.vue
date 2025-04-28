<script setup lang="ts">
import {useIsLoadingStore} from "~/store/auth.store";

useHead({
  title: 'Авторизация - Kanban System',
})

const loginRef = ref('')
const passwordRef = ref('')

const isLoadingStore = useIsLoadingStore()
const router = useRouter()

const login = async () => {
  isLoadingStore.set(true)
  try {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: {
        login: loginRef.value,
        password: passwordRef.value,
      }
    })
    if (error.value) {
      alert(error.value.data?.statusMessage || 'Ошибка входа')
      return
    }
    if (data.value?.user?.status) {
      await router.push('/')
    }
  } catch (err) {
    console.error('Ошибка входа', err)
    alert('Ошибка при авторизации')
  } finally {
    isLoadingStore.set(false)
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5 min-w-min">
      <h1 class="text-2xl font-bold text-center mb-5">Авторизация</h1>
      <form>
        <UiInput
            placeholder="Логин"
            type="email"
            v-model="loginRef"
            class="mb-3"/>
        <UiInput
            placeholder="Пароль"
            type="email"
            v-model="passwordRef"
            class="mb-3"/>
        <div class="flex items-center justify-center gap-5">
          <UiButton
              class="hover:bg-purple-900 text-white transition-colors"
              type="button"
              @click="login"
          >
            Вход
          </UiButton>
          <UiButton class="hover:bg-purple-900 text-white transition-colors" type="button">Регистрация</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>