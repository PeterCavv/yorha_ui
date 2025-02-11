<script setup>
import { useAuthStore } from '../stores/UserStore';
import { computed } from 'vue';


const authStore = useAuthStore();
const userRole = computed(() => authStore.user.role)
</script>

<template>
    <div class="center-container">
        <h1 style="text-align: center; letter-spacing: 12px; text-transform: uppercase; 
        font-size: 30px; color: #8B0000; margin-top: 0px;">
            {{ $t('start.warning_message') }}
        </h1>
        <p>
            {{ $t('not_authorized.message') }}
        </p>
        <button v-if="!userRole" class="button button-menu" style="text-transform: uppercase;"
        @click="() => {$router.push({name: 'home'});}">
            {{ $t("auth.button") }}
        </button>
        <button v-else class="button button-menu" style="text-transform: uppercase;">
            {{ $t("start.title") }}
        </button>
    </div>
</template>

<style scoped>
    .center-container {
        display: flex;
        justify-content: center; 
        align-items: center;
        height: 100vh; 
        flex-direction: column;
    }

    @media only screen and (max-width: 602px){
        .center-container{
            text-align: center;
        }
    }
</style>