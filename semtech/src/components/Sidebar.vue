<script setup lang="ts">
</script>

<template>
    <div id="dashboard-sidebar">
        <h1 id="sidebar-account-title">Account: User</h1>
        <button id="logout-link">Log Out</button>
        <button class="sidebar-button" style="background-color: #2C334B;">
            <div class="sidebar-button-interior">
                <img src="@/assets/home_icon.png"/>
                <h2 class="sidebar-button-title">Dashboard</h2>
            </div>
        </button>
        <button class="sidebar-button">
            <div class="sidebar-button-interior">
                <img src="@/assets/stats_icon.png"/>
                <h2 class="sidebar-button-title">View Stats</h2>
            </div>
        </button>
        <button class="sidebar-button">
            <div class="sidebar-button-interior">
                <img src="@/assets/search_icon.png"/>
                <h2 class="sidebar-button-title">Custom Query</h2>
            </div>
        </button>
        <button class="sidebar-button">
            <div class="sidebar-button-interior">
                <img src="@/assets/faq_icon.png"/>
                <h2 class="sidebar-button-title">FAQ Page</h2>
            </div>
        </button>
    </div>
</template>

<style>
    @import '@/assets/base.css';

    #dashboard-sidebar {
        background-color: #464E6A;
        width: 250px;
        height: 100vh;
    }

    #sidebar-account-title{
        text-align: center;
        color: white;
        font-family: main-text;
    }

    #logout-link {
        color: white;
        background-color: #DA7777;
        border: none;
        width: 80%;
        margin-left: 10%;
        font-size: 25px;
        font-family: main-text;
        text-align: center;
        border-radius: 25px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .sidebar-button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        text-align: center;
        cursor: pointer;
        width: 100%;
        padding-left: 20px;
    }

    .sidebar-button-interior {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .sidebar-button-title {
        color: white;
        margin-left: 20px;
    }
</style>