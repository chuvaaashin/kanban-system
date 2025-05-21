<script setup lang="ts">
import {ref} from "vue";
import CreateWorkersModal from '~/components/layout/CreateWorkersForm.vue'
import {useFetch} from "#app";

useHead({
  title: 'Сотрудники - Kanban System'
})

interface Worker {
  id: number
  name: string
  surname: string
  post: string
}

const authStore = useAuthStore()
const { data: workers, refresh } = await useFetch<Worker[]>('/api/workers', {
  headers: {
    Authorization: `Bearer ${authStore.user.id}`,
  }
})

const isModalOpen = ref(false)
const selectedWorkerId = ref<number | null>(null)

const deleteSelectedWorker = async () => {
  if (!selectedWorkerId.value) return

  const confirmed = confirm('Удалить выбранного сотрудника?')
  if (!confirmed) return

  const { error } = await useFetch(`/api/workers?id=${selectedWorkerId.value}`, {
    method: 'DELETE'
  })

  if (!error.value) {
    selectedWorkerId.value = null
    refresh()
  }
}
</script>

<template>
  <div class="p-10 flex justify-between">
    <h1 class="font-bold text-2xl mb-3">Список сотрудников</h1>
    <div class="pt-3">
      <UiButton
          class="w-56 bg-purple-700"
          @click="isModalOpen = true"
      >
        Добавить сотрудника
      </UiButton>
      <UiButton
          class="w-56 bg-purple-700 ml-5"
          :disabled="!selectedWorkerId"
          @click="deleteSelectedWorker"
      >
        Удалить сотрудника
      </UiButton>
    </div>
  </div>
  <CreateWorkersModal v-if="isModalOpen" @close="isModalOpen = false" />
  <div class="mt-5 w-full">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-gray-800 text-white">
        <th class="p-3">Имя</th>
        <th class="p-3">Фамилия</th>
        <th class="p-3">Должность</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(worker) in workers"
        :key="worker.id"
        @click="selectedWorkerId = worker.id"
        :class="[
          'border-b border-gray-700 hover:bg-gray-800 cursor-pointer',
          selectedWorkerId === worker.id ? 'bg-gray-700' : ''
        ]"
      >
        <td class="p-3">{{ worker.name }}</td>
        <td class="p-3">{{ worker.surname }}</td>
        <td class="p-3">{{ worker.post }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>

</style>