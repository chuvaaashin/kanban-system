<script setup lang="ts">
useHead({
  title: 'Доска задач - Kanban System'
})
const { data, error } = await useFetch('/api/kanban', {
  method: 'GET',
})
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Kanban Board</h1>
  </div>
  <div class="grid grid-cols-4">
    <div>
    <h2 class="m-6 bg-purple-950 rounded-lg flex justify-center items-center h-14 max-w-72">Архив</h2>
    <UiCard class="m-6 max-w-72" draggable="true">
    <UiCardHeader role="button"> Название задачи </UiCardHeader>
    <UiCardContent class="text-gray-500" > Описание </UiCardContent>
    <UiCardFooter class="text-gray-600 text-sm"> Дата </UiCardFooter>
    </UiCard>

    <UiCard class="m-6 max-w-72" draggable="true">
    <UiCardHeader role="button"> Название задачи </UiCardHeader>
    <UiCardContent class="text-gray-500" > Описание </UiCardContent>
    <UiCardFooter class="text-gray-600 text-sm"> Дата </UiCardFooter>
    </UiCard>
    </div>

    <div>
    <h2 class="m-6 bg-purple-900 rounded-lg flex justify-center items-center min-h-14 max-w-72">В работе</h2>
    </div>

    <div>
    <h2 class="m-6 bg-purple-800 rounded-lg flex justify-center items-center min-h-14 max-w-72">На паузе</h2>
    <UiCard class="m-6 max-w-72" draggable="true">
    <UiCardHeader role="button"> Название задачи </UiCardHeader>
    <UiCardContent class="text-gray-500" > Описание </UiCardContent>
    <UiCardFooter class="text-gray-600 text-sm"> Дата </UiCardFooter>
    </UiCard>
    </div>

    <div>
    <h2 class="m-6 bg-purple-700 rounded-lg flex justify-center items-center min-h-14 max-w-72">Выполнено</h2>
    <UiCard class="m-6 max-w-72" draggable="true">
    <UiCardHeader role="button"> Название задачи </UiCardHeader>
    <UiCardContent class="text-gray-500" > Описание </UiCardContent>
    <UiCardFooter class="text-gray-600 text-sm"> Дата </UiCardFooter>
    </UiCard>
    </div>
  </div>

</template>

<style scoped>

</style>