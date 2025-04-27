<script lang="ts" setup>

</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtImg src="/logo.svg" alt="Logo" width="190px" class="mx-auto cursor-default mb-10 block"/>
    <NuxtLink to="/login"
        class="absolute top-2 right-3 transition-colors hover:text-primary">
      <Icon name="line-md:logout" size="20"/>
    </NuxtLink>
    <LayoutMenu/>
  </aside>
</template>