<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";

useHead({
  title: 'Главная - Kanban System'
})

const authStore = useAuthStore()
console.log(authStore.user)
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System by Nikita Chebaev</h1>
  </div>
</template>

<style scoped>

</style>