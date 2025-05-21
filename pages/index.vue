<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useFetch} from "#app";

useHead({
  title: 'Главная - Kanban System'
})

const authStore = useAuthStore()
const { data: tasks } = await useFetch('/api/kanban/kanban', {
  headers: {
    Authorization: `Bearer ${authStore.user.id}`,
  },
  transform: (data: any) => data as Array<{ id: number; name: string; status: string; description: string; created_at: string }>
})
const total = computed(() => tasks.value?.length || 0)
const inProgress = computed(() =>
  tasks.value?.filter(t => t.status === 'in_progress').length || 0
)
const paused = computed(() =>
  tasks.value?.filter(t => t.status === 'paused').length || 0
)
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-3">Система оптимизации и управления разработкой</h1>
    <h2 class="text-xl mb-3">Привет, {{ authStore.user?.login || 'пользователь' }} 👋</h2>
  </div>
  <div class="mt-8 p-10">
    <div v-if="tasks" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <div class="p-4 bg-[#0f172a] rounded text-center">
        <div class="text-2xl font-bold text-purple-400">{{ total }}</div>
        <div class="text-sm text-gray-400">Всего задач</div>
      </div>
      <div class="p-4 bg-[#0f172a] rounded text-center">
        <div class="text-2xl font-bold text-yellow-400">{{ inProgress }}</div>
        <div class="text-sm text-gray-400">В работе</div>
      </div>
      <div class="p-4 bg-[#0f172a] rounded text-center">
        <div class="text-2xl font-bold text-blue-400">{{ paused }}</div>
        <div class="text-sm text-gray-400">На паузе</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>