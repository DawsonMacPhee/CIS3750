<script lang="ts">
    export default {
        props: {
            nodes: Number,
            unique: Number,
            relations: Number
        }
    }
</script>

<template>
    <div id="stats-container">
        <h1 id="stats-title">Graph Stats</h1>
        <p class="stats-info">Nodes: {{ nodes }}</p>
        <p class="stats-info">Unique: {{ unique }}</p>
        <p class="stats-info">Relations: {{ relations }}</p>
    </div>
</template>

<style>
    @import '@/assets/base.css';

    #stats-container {
        width: 100%;
        height: 50%;
        background-color: #91A7DE;
        padding-left: 20px;
    }

    #stats-title {
        font-family: main-text;
        text-decoration: underline;
    }

    .stats-info {
        font-family: main-text;
        font-size: 20px;
    }
</style>