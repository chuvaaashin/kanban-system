<script setup lang="ts">
useHead({
  title: 'Цели - Kanban System'
})
const { data: orders, refresh } = await useFetch('/api/orders')
</script>

<template>
  <div class="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
        v-for="order in orders"
        :key="order.id"
        class="bg-[#1e1b3a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
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
</template>

<style scoped>
</style>
