<template>
    <div
      v-if="isVisible"
      class="notification-modal"
      :class="type"
      @click="closeModal"
    >
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'success',
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-modal {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    z-index: 1000;
    cursor: pointer;
    animation: fadeIn 0.5s ease;
  }
  .notification-modal.success {
    background-color: #4caf50;
  }
  .notification-modal.error {
    background-color: #f44336;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>