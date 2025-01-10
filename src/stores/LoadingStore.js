import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
        isLoading: false
  }),
  actions: {
    showLoader() {
      this.isLoading = true;
    },
    hideLoader() {
      this.isLoading = false;
    }
  }
});