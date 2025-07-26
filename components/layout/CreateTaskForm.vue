<script setup lang="ts">
import { useAuthStore} from "~/store/auth.store";
interface Worker {
  id: number
  name: string
  surname: string
  post: string
}
interface Order {
  id: number
  title: string
  description: string
  progress: number
}
const authStore = useAuthStore()

const { data: orders } = await useFetch<Order[]>('/api/orders', {
    headers: {
    Authorization: `Bearer ${authStore.user.id}`
  }
})
const { data: workers } = await useFetch<Worker[]>('/api/workers', {
    headers: {
    Authorization: `Bearer ${authStore.user.id}`
  }
})
import { ref } from 'vue'
const emit = defineEmits(['create'])

const name = ref('')
const status = ref('backlog')
const description = ref('')
const order_id = ref<number | null>(null)
const worker_id = ref<number | null>(null)

const statuses = [
  { value: 'backlog', label: 'Архив' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'paused', label: 'На паузе' },
  { value: 'done', label: 'Выполнено' }
]

const createTask = async () => {
  const userId = authStore.user.id
  const { error } = await useFetch('/api/kanban/createTask', {
    method: 'POST',
    body: {
      name: name.value,
      status: status.value,
      description: description.value,
      order_id: order_id.value,
      worker_id: worker_id.value,
      user_id: userId
    }
  })

  if (!error.value) {
    emit('create')
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-[var(--popover)] rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
          @click="$emit('create')"
      >
        ✖
      </button>
      <h2 class="text-xl font-bold mb-4">Создание задачи</h2>
      <form @submit.prevent="createTask">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Название</label>
          <input v-model="name" type="text" class="border rounded w-full p-2 bg-[var(--popover)]" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Статус</label>
          <select v-model="status" class="border rounded w-full p-2 bg-[var(--popover)]">
            <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Описание</label>
          <textarea v-model="description" class="border rounded w-full p-2 bg-[var(--popover)]" rows="4" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Цель</label>
          <select v-model="order_id" class="border rounded w-full p-2 bg-[var(--popover)]">
            <option :value="null" disabled>Выберите цель</option>
            <option v-for="order in orders" :key="order.id" :value="order.id">
              {{ order.title }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Сотрудник</label>
          <select v-model="worker_id" class="border rounded w-full p-2 bg-[var(--popover)]">
            <option :value="null" disabled>Назначить сотрудника</option>
            <option v-for="worker in workers" :key="worker.id" :value="worker.id">
              {{ worker.name }} {{ worker.surname }}
            </option>
          </select>
        </div>

        <UiButton type="submit" class="bg-purple-700 text-white w-full">
          Сохранить задачу
        </UiButton>
      </form>
    </div>
  </div>
</template>
