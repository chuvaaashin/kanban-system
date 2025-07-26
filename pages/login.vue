<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useIsLoadingStore} from "~/store/loading.store";
import { ref } from 'vue'

useHead({
  title: 'Авторизация - Kanban System',
})

const loginRef = ref('')
const passwordRef = ref('')
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()
const showRegistrationForm = ref(false);
const id = ref('')
const login = ref('')
const password = ref('')

const authorize = async () => {
  const hasUser = (obj: any): obj is {user:{id:null | number, login: string, name: string, status: boolean}} => {
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
        id: data.value.user.id,
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

const createUser = async () => {
  const { error } = await useFetch('/api/register', {
    method: 'POST',
    body: {
      id: id.value,
      login: login.value,
      password: password.value,
    }
  })

  if (!error.value) {
    showRegistrationForm.value = false
    successMessage.value = 'Поздравляем с успешной регистрацией! Теперь авторизуйтесь, чтобы начать работу.'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full" v-if="showRegistrationForm === false">
    <div class="rounded bg-sidebar w-1/4 p-5 min-w-min">
      <h1 class="text-2xl font-bold text-center">Авторизация</h1>
      <div v-if="errorMessage" class="text-red-600 text-center"> {{errorMessage}} </div>
      <div v-if="successMessage" class="text-green-600 text-center text-xs"> {{successMessage}}</div>
      <form @submit.prevent="authorize">
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
              @click="showRegistrationForm = true"
          >
            Регистрация
          </UiButton>
        </div>
      </form>
    </div>
  </div>
  <div v-if="showRegistrationForm === true">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-[#0b1120] rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
            class="absolute top-2 right-2 text-gray-500 hover:text-black"
            @click="showRegistrationForm = false"
        >
          ✖
        </button>
        <h2 class="text-xl font-bold mb-4">Регистрация</h2>
        <form @submit.prevent="createUser">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Логин</label>
            <input
                v-model="login"
                type="text"
                class="border rounded w-full p-2 bg-[#0b1120]"
                required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Пароль</label>
            <input
                v-model="password"
                type="text"
                class="border rounded w-full p-2 bg-[#0b1120]"
                required
            />
          </div>

          <UiButton type="submit" class="bg-purple-700 text-white w-full">
            Регистрация
          </UiButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>