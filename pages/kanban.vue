<script setup lang="ts">
import { ref } from 'vue'
import CreateTaskModal from '~/components/layout/CreateTaskForm.vue'
useHead({
  title: 'Доска задач - Kanban System'
})
const statuses = ['backlog', 'in_progress', 'pause', 'done']
const { data: tasks, error } = await useFetch('/api/kanban')
const backlog = computed(() => tasks.value?.filter(t => t.status === 'backlog') || [])
const inProgress = computed(() => tasks.value?.filter(t => t.status === 'in_progress') || [])
const paused = computed(() => tasks.value?.filter(t => t.status === 'paused') || [])
const done = computed(() => tasks.value?.filter(t => t.status === 'done') || [])

const isFormOpen = ref(false)

const name = ref('')
const status = ref('backlog')
const description = ref('')
const isModalOpen = ref(false)
</script>

<template>

  <div class="p-10 flex justify-between items-center">
    <h1 class="font-bold text-2xl mb-10">Kanban Board</h1>
    <UiButton class="w-56 bg-purple-700" @click="isModalOpen = true">
      {{ isFormOpen ? 'Закрыть форму' : 'Создать задачу' }}
    </UiButton>
  </div>
  <CreateTaskModal v-if="isModalOpen" @close="isModalOpen = false" />
  <div class="grid grid-cols-4">
    <div>
      <h2 class="m-6 bg-purple-950 rounded-lg flex justify-center items-center h-14 max-w-72">Архив</h2>
      <template v-for="task in backlog" :key="task.id">
        <UiCard class="m-6 max-w-72" draggable="true">
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500">{{ task.description }}</UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ task.created_at }}</UiCardFooter>
        </UiCard>
      </template>
    </div>

    <div>
      <h2 class="m-6 bg-purple-900 rounded-lg flex justify-center items-center h-14 max-w-72">В работе</h2>
      <template v-for="task in inProgress" :key="task.id">
        <UiCard class="m-6 max-w-72" draggable="true">
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500">{{ task.description }}</UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ task.created_at }}</UiCardFooter>
        </UiCard>
      </template>
    </div>

    <div>
      <h2 class="m-6 bg-purple-800 rounded-lg flex justify-center items-center h-14 max-w-72">На паузе</h2>
      <template v-for="task in paused" :key="task.id">
        <UiCard class="m-6 max-w-72" draggable="true">
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500">{{ task.description }}</UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ task.created_at }}</UiCardFooter>
        </UiCard>
      </template>
    </div>

    <div>
      <h2 class="m-6 bg-purple-700 rounded-lg flex justify-center items-center h-14 max-w-72">Выполнено</h2>
      <template v-for="task in done" :key="task.id">
        <UiCard class="m-6 max-w-72" draggable="true">
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500">{{ task.description }}</UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ task.created_at }}</UiCardFooter>
        </UiCard>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>