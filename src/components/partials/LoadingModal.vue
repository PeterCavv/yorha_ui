<template>
    <div v-if="visible" class="loading-modal">
      <div class="loading-row">
        <p>{{ $t("loading_modal.message") }}</p>
        <div class="spinner"></div>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    }
  };
</script>
  
<style scoped>
  .loading-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  p{
    margin-top: 15px;
    color: #dcd8c0;
    text-transform: uppercase;
    letter-spacing: 7px;
    font-size: x-large;
  }
  .loading-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* Espacio entre el texto y el spinner */
    }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #dcd8c0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>