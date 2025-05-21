<script setup lang="ts">
import { ref } from 'vue'
import CreateTaskModal from '~/components/layout/CreateTaskForm.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useFetch } from '#app'
import {useAuthStore} from "~/store/auth.store";

useHead({
  title: 'Доска задач - Kanban System'
})

const authStore = useAuthStore()

const { data: tasks, refresh } = await useFetch('/api/kanban/kanban', {
  headers: {
    Authorization: `Bearer ${authStore.user.id}`,
  },
  transform: (data: any) => data as Array<{ id: number; name: string; status: string; description: string; created_at: string }>
})

const backlog = computed(() => tasks.value?.filter(t => t.status === 'backlog') || [])
const inProgress = computed(() => tasks.value?.filter(t => t.status === 'in_progress') || [])
const paused = computed(() => tasks.value?.filter(t => t.status === 'paused') || [])
const done = computed(() => tasks.value?.filter(t => t.status === 'done') || [])

const isFormOpen = ref(false)
const isModalOpen = ref(false)

dayjs.locale('ru')

const onDragStart = (event: DragEvent, taskId: number) => {
  event.dataTransfer?.setData('taskId', taskId.toString())
  event.dataTransfer?.setData('text/plain', taskId.toString())
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = async (event: DragEvent, newStatus: string) => {
  event.preventDefault()
  const taskId = event.dataTransfer?.getData('taskId')
  if (!taskId) {
    return
  }
  try {
    const id = parseInt(taskId)
    if (isNaN(id)) {
      return
    }
    const response = await $fetch('/api/kanban/kanbanUpdate', {
      method: 'PATCH',
      body: { id, status: newStatus }
    })
    await refresh()
  } catch (error) {
  }
}

const formatDate = (date: string) => {
  return dayjs(date).isValid() ? dayjs(date).format('D MMMM YYYY, HH:mm') : 'Неправильная дата'
}

const refreshAndOffModal = async () => {
  await refresh()
  isModalOpen.value = false
}
</script>

<template>
  <div class="p-10 flex justify-between items-center">
    <h1 class="font-bold text-2xl mb-10">Kanban Board</h1>
    <div>
      <UiButton class="w-56 bg-purple-700" @click="isModalOpen = true">
        {{ isFormOpen ? 'Закрыть форму' : 'Создать задачу' }}
      </UiButton>
      <UiButton
          class="w-56 bg-purple-700 ml-5"
          @click="isModalOpen = true"
          :disabled="true"
      >
        Удалить задачу
      </UiButton>
    </div>
  </div>
  <CreateTaskModal v-if="isModalOpen" @create="refreshAndOffModal" />
  <div class="grid grid-cols-4 gap-4">
    <div
        class="min-h-[400px] p-4 rounded-lg"
        @dragover="onDragOver"
        @drop="onDrop($event, 'backlog')"
    >
      <h2 class="m-6 bg-purple-950 text-white rounded-lg flex justify-center items-center h-14 max-w-72">Архив</h2>
      <template v-for="task in backlog" :key="task.id">
        <UiCard
            class="m-6 max-w-72 cursor-pointer"
            draggable="true"
            @dragstart="onDragStart($event, task.id)"
            @click="$router.push(`/${task.id}`)"
        >
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500 truncate">
            {{ task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description }}
          </UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ dayjs(task.created_at).format('D MMMM YYYY, HH:mm') }}</UiCardFooter>
        </UiCard>

      </template>
    </div>

    <div
        class="min-h-[400px] p-4 rounded-lg"
        @dragover="onDragOver"
        @drop="onDrop($event, 'in_progress')"
    >
      <h2 class="m-6 bg-purple-900 text-white rounded-lg flex justify-center items-center h-14 max-w-72">В работе</h2>
      <template v-for="task in inProgress" :key="task.id">
        <UiCard
            class="m-6 max-w-72 cursor-pointer"
            draggable="true"
            @dragstart="onDragStart($event, task.id)"
            @click="$router.push(`/${task.id}`)"
        >
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500 truncate">
            {{ task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description }}
          </UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ dayjs(task.created_at).format('D MMMM YYYY, HH:mm') }}</UiCardFooter>
        </UiCard>

      </template>
    </div>

    <div
        class="min-h-[400px] p-4 rounded-lg"
        @dragover="onDragOver"
        @drop="onDrop($event, 'paused')"
    >
      <h2 class="m-6 bg-purple-800 text-white rounded-lg flex justify-center items-center h-14 max-w-72">На паузе</h2>
      <template v-for="task in paused" :key="task.id">
        <UiCard
            class="m-6 max-w-72 cursor-pointer"
            draggable="true"
            @dragstart="onDragStart($event, task.id)"
            @click="$router.push(`/${task.id}`)"
        >
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500 truncate">
            {{ task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description }}
          </UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ dayjs(task.created_at).format('D MMMM YYYY, HH:mm') }}</UiCardFooter>
        </UiCard>

      </template>
    </div>

    <div
        class="min-h-[400px] p-4 rounded-lg"
        @dragover="onDragOver"
        @drop="onDrop($event, 'done')"
    >
      <h2 class="m-6 bg-purple-700 text-white rounded-lg flex justify-center items-center h-14 max-w-72">Выполнено</h2>
      <template v-for="task in done" :key="task.id">
        <UiCard
            class="m-6 max-w-72 cursor-pointer"
            draggable="true"
            @dragstart="onDragStart($event, task.id)"
            @click="$router.push(`/${task.id}`)"
        >
          <UiCardHeader role="button">{{ task.name }}</UiCardHeader>
          <UiCardContent class="text-gray-500 truncate">
            {{ task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description }}
          </UiCardContent>
          <UiCardFooter class="text-gray-600 text-sm">{{ dayjs(task.created_at).format('D MMMM YYYY, HH:mm') }}</UiCardFooter>
        </UiCard>

      </template>
    </div>
  </div>
</template>

<style scoped>

</style>