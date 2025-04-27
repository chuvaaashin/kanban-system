<script setup lang="ts">
useHead({
  title: 'Авторизация - CRM System',
})
import {Input} from "~/components/ui/input";

const loginRef = ref('')
const passwordRef = ref('')

</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
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
          <UiButton type="button">Вход</UiButton>
          <UiButton type="button">Регистрация</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>