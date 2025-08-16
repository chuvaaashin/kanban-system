<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useIsLoadingStore} from "~/store/loading.store";

const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()

onMounted(async () => {
  try {
    if (!authStore.isAuth) {
      await router.push('/login')
    }
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <LayoutLoader v-show="isLoadingStore.isLoading" />
  <section :class="{grid: authStore.isAuth}">
    <LayoutSidebar v-show="authStore.isAuth"/>
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