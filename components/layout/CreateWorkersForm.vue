<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])

const name = ref('')
const surname = ref('')
const post = ref('')

const createTask = async () => {
  const { data, error } = await useFetch('/api/createWorkers', {
    method: 'POST',
    body: {
      name: name.value,
      surname: surname.value,
      post: post.value,
    }
  })

  if (!error.value) {
    emit('close')
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-[#0b1120] rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-black"
        @click="$emit('close')"
      >
        ✖
      </button>
      <h2 class="text-xl font-bold mb-4">Добавить сотрудника</h2>
      <form @submit.prevent="createTask">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Имя</label>
          <input
            v-model="name"
            type="text"
            class="border rounded w-full p-2 bg-[#0b1120]"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Фамилия</label>
          <input
            v-model="surname"
            type="text"
            class="border rounded w-full p-2 bg-[#0b1120]"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Должность</label>
          <input
            v-model="post"
            type="text"
            class="border rounded w-full p-2 bg-[#0b1120]"
            required
          />
        </div>

        <UiButton type="submit" class="bg-purple-700 text-white w-full">
          Сохранить сотрудника
        </UiButton>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>