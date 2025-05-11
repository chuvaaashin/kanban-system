<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
import CreateOrderForm from '~/components/layout/CreateOrderForm.vue'
useHead({
  title: 'Цели - Kanban System'
})
const selectedOrderId = ref<number | null>(null)
const isModalOpen = ref(false)
const { data: orders, refresh } = await useFetch('/api/orders')

const deleteOrder = async () => {
  if (selectedOrderId.value) {
    const { error } = await useFetch(`/api/orders?id=${selectedOrderId.value}`, {
      method: 'DELETE'
    })
    if (!error.value) {
      selectedOrderId.value = null
      await refresh()
    }
  }
}
</script>

<template>
<div class="p-10 flex justify-between items-center">
  <h1 class="font-bold text-2xl mb-10">Цели</h1>
  <div>
    <UiButton
        class="w-56 bg-purple-700"
        @click="isModalOpen = true"
    >
      Создать цель
    </UiButton>
    <UiButton
        class="w-56 bg-purple-700 ml-5"
        :disabled="!selectedOrderId"
        @click="deleteOrder"
    >
      Удалить цель
    </UiButton>
  </div>
</div>
<div class="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
      v-for="order in orders"
      :key="order.id"
      class="bg-[#1e1b3a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
      @click="selectedOrderId = order.id"
  :class="[
  selectedOrderId === order.id ? 'bg-purple-700' : '',
  'cursor-pointer'
  ]"
  >
  <h2 class="text-xl font-bold text-white mb-2">{{ order.title }}</h2>
  <p class="text-sm text-gray-400 mb-4">{{ order.description }}</p>

  <div class="w-full bg-gray-700 h-2 rounded overflow-hidden">
    <div
        class="bg-purple-500 h-2"
        :style="{ width: order.progress + '%' }"
    ></div>
  </div>

  <p class="text-xs text-gray-400 mt-2">Прогресс: {{ order.progress }}%</p>
</div>
</div>

<CreateOrderForm
    v-if="isModalOpen"
    @close="isModalOpen = false"
    @orderCreated="refresh"
/>
</template>

<style scoped>
</style>
