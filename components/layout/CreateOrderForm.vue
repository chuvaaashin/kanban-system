<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'

const emit = defineEmits(['close', 'orderCreated'])

const title = ref('')
const description = ref('')
const isLoading = ref(false)

const createOrder = async () => {
  isLoading.value = true
  const { error } = await useFetch('/api/orders', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value
    }
  })

  isLoading.value = false

  if (!error.value) {
    emit('orderCreated')
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
      <h2 class="text-xl font-bold mb-4">Создание цели</h2>
      <form @submit.prevent="createOrder">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Название</label>
          <input
              v-model="title"
              type="text"
              class="border rounded w-full p-2 bg-[#0b1120]"
              required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Описание</label>
          <textarea
              v-model="description"
              class="border rounded w-full p-2 bg-[#0b1120]"
              rows="4"
              required
          />
        </div>

        <UiButton
            :disabled="isLoading"
            type="submit"
            class="bg-purple-700 text-white w-full"
        >
          Сохранить цель
        </UiButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
