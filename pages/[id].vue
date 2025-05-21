<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFetch } from '#app'
import { useAuthStore} from "~/store/auth.store";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const route = useRoute()
const taskId = route.params.id
const authStore = useAuthStore()

const { data: task, error } = await useFetch(`/api/kanban/${taskId}`, {
    headers: {
    Authorization: `Bearer ${authStore.user.id}`
  }
})

</script>

<template>
  <div v-if="task" class="p-10 bg-[#0b1120] rounded-xl text-white">
    <h1 class="text-3xl font-bold mb-6">{{ task.name }}</h1>

    <div v-if="task.order_title" class="mb-4">
      <h2 class="text-sm text-gray-400">Связанная цель:</h2>
      <p class="text-md font-medium">{{ task.order_title }}</p>
    </div>

    <div v-if="task.worker_name" class="mb-4">
      <h2 class="text-sm text-gray-400">Ответственный:</h2>
      <p class="text-md font-medium">
        {{ task.worker_name }} {{ task.worker_surname }}
      </p>
    </div>

    <div class="mb-4">
      <h2 class="text-sm text-gray-400">Статус:</h2>
      <p
          :class="{
          'text-yellow-300': task.status === 'paused',
          'text-green-400': task.status === 'done',
          'text-purple-300': task.status === 'in_progress',
          'text-gray-300': task.status === 'backlog'
        }"
          class="font-medium"
      >
        {{ task.status }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-sm text-gray-400">Описание:</h2>
      <p class="whitespace-pre-line text-gray-200">{{ task.description }}</p>
    </div>

    <p class="text-xs text-gray-500">
      Создано: {{ dayjs(task.created_at).format('D MMMM YYYY, HH:mm') }}
    </p>
  </div>

  <div v-else class="p-10 text-red-500">Задача не найдена</div>
</template>




<style scoped>

</style>