<script setup lang="ts">
useHead({
  title: 'Доска задач - Kanban System'
})
</script>

<template>
  <UiCard class="m-3" draggable="true">
    <UiCardHeader role="button"> name card </UiCardHeader>
    <UiCardContent> Компания </UiCardContent>
    <UiCardFooter> Date </UiCardFooter>
  </UiCard>
</template>

<style scoped>

</style>