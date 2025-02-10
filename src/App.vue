<script setup>
  import Nav from "@/components/partials/Nav.vue"
  import { useLoadingStore } from "./stores/LoadingStore";

  const store = useLoadingStore();
</script>

<template>
  <Nav></Nav>
  <router-view/>
  <Transition name="fade">
    <LoadingModal :visible="store.isLoading" />
  </Transition>

</template>

<script>
import LoadingModal from "./components/partials/LoadingModal.vue";

export default {
  components: {
    LoadingModal
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>




