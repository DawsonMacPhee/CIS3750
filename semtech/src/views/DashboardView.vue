<script setup lang="ts">
    import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <main>
        <div id="dashboard-wrapper">
            <Sidebar />
            <div id="#dashboard-content">
                <h1>Content</h1>
            </div>
        </div>
    </main>
</template>

<style>

    #dashboard-wrapper {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }

</style>