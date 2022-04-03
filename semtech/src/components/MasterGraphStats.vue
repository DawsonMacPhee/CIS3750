<script setup lang="ts">
</script>

<template>
    <div id="mstats-wrapper">
        <span class="entry">Total Nodes: </span>
        <span class="entry">Custom Queries: </span>
        <span class="entry">Total Stat Graphs: </span>
        <span class="entry">Total Users: </span>
    </div>
</template>

<style>
    @import '@/assets/base.css';

    .entry {
        display: block;
        font-family: main-text;
        font-size: 30px;
        margin-bottom: 10px;
    }

    #mstats-wrapper {
        margin-bottom: 23px;
    }
</style>