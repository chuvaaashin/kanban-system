<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";

useHead({
  title: 'Авторизация - Kanban System',
})

const loginRef = ref('')
const passwordRef = ref('')
const errorMessage = ref<string | null>(null)

const authStore = useAuthStore()

const isLoadingStore = useIsLoadingStore()
const router = useRouter()

const login = async () => {
  const hasUser = (obj: any): obj is {user:{login: string, name: string, status: boolean}} => {
    return obj && 'user' in obj;
  };
  setTimeout(()=> {
    isLoadingStore.set(true)
  }, 700)
  try {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: {
        login: loginRef.value,
        password: passwordRef.value,
      },
      redirect: "manual",
      onResponseError({ response }) {
        errorMessage.value = response._data?.statusMessage || 'Ошибка входа'
      }
    })
    if (error.value) {
      errorMessage.value = error.value.data?.statusMessage
      return
    }
    if (hasUser(data.value) && data.value?.user?.status) {
      authStore.set({
        login: loginRef.value,
        password: passwordRef.value,
        status: true,
      })
      console.log('authStore set', authStore.user)
      await router.push('/')
    }
  } catch (err) {
    console.error('Ошибка входа', err)
  } finally {
    setTimeout(()=> {
      isLoadingStore.set(false)
    }, 700)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5 min-w-min">
      <h1 class="text-2xl font-bold text-center">Авторизация</h1>
      <div v-if="errorMessage" class="text-red-600 text-center"> {{errorMessage}} </div>
      <form @submit.prevent="login">
        <UiInput
            placeholder="Логин"
            type="text"
            v-model="loginRef"
            class="mb-3 mt-5"/>
        <UiInput
            placeholder="Пароль"
            type="text"
            v-model="passwordRef"
            class="mb-3"/>
        <div class="flex items-center justify-center gap-5">
          <UiButton
              class="hover:bg-purple-900 text-white transition-colors"
              type="submit"
          >
            Вход
          </UiButton>
          <UiButton class="hover:bg-purple-900 text-white transition-colors"
              type="button"
          >
            Регистрация
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>