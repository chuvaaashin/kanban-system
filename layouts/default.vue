<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useIsLoadingStore} from "~/store/loading.store";

const store = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()

onMounted(async () => {
  try {
    if (!store.isAuth) {
      await router.push('/login')
    }
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{grid: store.isAuth}">
    <LayoutSidebar v-if="store.isAuth"/>
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
</style>/