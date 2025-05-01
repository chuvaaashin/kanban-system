<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";

useHead({
  title: 'Главная - Kanban System'
})

const authStore = useAuthStore()
console.log(authStore.user)
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-3">CRM System by Nikita Chebaev</h1>
    <h2 class="text-xl mb-6">Привет, {{ authStore.user?.login || 'пользователь' }} 👋</h2>
  </div>
  <div class="mt-8 p-10">
    <h3 class="text-lg font-semibold mb-4">Статистика</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 bg-[#0f172a] rounded text-center">
        <div class="text-2xl font-bold text-purple-400">12</div>
        <div class="text-sm text-gray-400">Всего задач</div>
      </div>
      <div class="p-4 bg-[#0f172a] rounded text-center">
        <div class="text-2xl font-bold text-yellow-400">4</div>
        <div class="text-sm text-gray-400">В работе</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>