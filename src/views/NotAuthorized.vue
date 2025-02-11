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
            Está intentando acceder a una zona restringida de YoRHa sin los permisos requeridos.
        </p>
        <button v-if="!userRole" class="button button-menu" @click="() => {$router.push({name: 'home'});}">Iniciar Sesión</button>
        <button v-else class="button button-menu">Menú de Inicio</button>
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