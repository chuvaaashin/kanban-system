<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-[#0b1120] rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-black"
        @click="$emit('close')"
      >
        ✖
      </button>
      <h2 class="text-xl font-bold mb-4">Создание задачи</h2>
      <form @submit.prevent="createTask">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Название</label>
          <input
            v-model="name"
            type="text"
            class="border rounded w-full p-2 bg-[#0b1120]"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Статус</label>
          <select
            v-model="status"
            class="border rounded w-full p-2 bg-[#0b1120]"
          >
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Описание</label>
          <textarea
            v-model="description"
            class="border rounded w-full p-2 bg-[#0b1120]"
            rows="4"
          />
        </div>

        <UiButton type="submit" class="bg-purple-700 text-white w-full">
          Сохранить задачу
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])

const name = ref('')
const status = ref('backlog')
const description = ref('')
const statuses = ['backlog', 'in_progress', 'paused', 'done']

const createTask = async () => {
  const { data, error } = await useFetch('/api/createTask', {
    method: 'POST',
    body: {
      name: name.value,
      status: status.value,
      description: description.value,
    }
  })

  if (error.value) {
    alert('Ошибка при создании задачи')
  } else {
    alert('Задача создана!')
    emit('close')
  }
}
</script>
