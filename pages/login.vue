<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";

useHead({
  title: 'Авторизация - Kanban System',
})

const loginRef = ref('')
const passwordRef = ref('')
const ErrorMessage = ref<'string' | null>(null)

const authStore = useAuthStore()

const isLoadingStore = useIsLoadingStore()
const router = useRouter()

const login = async () => {
  const hasUser = (obj: any): obj is {user:{login: string, name: string, status: boolean}} => {
    return obj && 'user' in obj;
  };
  isLoadingStore.set(true)
  try {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: {
        login: loginRef.value,
        password: passwordRef.value,
      }
    })
    if (hasUser(data.value) && data.value?.user?.status) {
      authStore.set({
        login: loginRef.value,
        password: passwordRef.value,
        status: true,
      })
      await router.push('/')
    }
    if (error.value) {
      alert(error.value.data?.statusMessage || 'Ошибка входа')
      return
    }
  } catch (err) {
    console.error('Ошибка входа', err)
    alert('Ошибка при авторизации')
  } finally {
    isLoadingStore.set(false)
  }
}
console.log(authStore.user)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5 min-w-min">
      <h1 class="text-2xl font-bold text-center mb-5">Авторизация</h1>
      <form>
        <UiInput
            :placeholder="ErrorMessage || 'Логин'"
            type="email"
            v-model="loginRef"
            class="mb-3"/>
        <UiInput
            :placeholder="ErrorMessage || 'Пароль'"
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