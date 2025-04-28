<script lang="ts" setup>
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";
const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()

const logout = async () => {
  isLoadingStore.set(true)
  store.clear()
  isLoadingStore.set(false)
}
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtImg src="/logo.svg" alt="Logo" width="190px" class="mx-auto cursor-default mb-10 block"/>
    <NuxtLink to="/login" @click="logout"
        class="absolute top-2 right-3 transition-colors hover:text-primary">
      <Icon name="line-md:logout" size="20"/>
    </NuxtLink>
    <LayoutMenu/>
  </aside>
</template>