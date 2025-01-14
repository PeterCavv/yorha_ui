<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
    <Teleport to="body">
        <div v-if="open">
            <cite>Hola</cite>
        </div>
    </Teleport>
</template>

<style>

.modal{

}

</style>