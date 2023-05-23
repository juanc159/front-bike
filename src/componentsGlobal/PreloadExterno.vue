<script setup lang="ts">
import Preload from '@/componentsGlobal/Preload.vue';
</script>
<template>
    <div class="preload-container"> 
        <Preload />
    </div>
</template>

<style scoped>
.preload-container { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh !important;
    z-index: 10000000000 !important;
}  
</style>