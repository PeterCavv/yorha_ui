<script setup>
  import Nav from "@/components/partials/Nav.vue"
  import { useLoadingStore } from "./stores/LoadingStore";

  const store = useLoadingStore();
</script>

<template>
  <Nav></Nav>
  <router-view/>
  <LoadingModal :visible="store.isLoading" />
</template>

<script>
import LoadingModal from "./components/partials/LoadingModal.vue";

export default {
  components: {
    LoadingModal
  }
};
</script>




