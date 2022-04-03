<script setup lang="ts">
    import MasterGraphStats from '@/components/MasterGraphStats.vue'
</script>

<template>
    <main>
        <img class="logo" src="@/assets/logo.jpg">
        <div id="wrapper">
            <div id="content">
                <h1 id="title"> Welcome to ... </h1>
                <p id="description">The graph database court data exploration tool! Our service 
                allows for storing and analiyzing court data information. 
                Students, teachers, lawyers, judges, etc. can make the unique 
                insights about the data, it’s patterns and relationships.</p>
                <MasterGraphStats />
                <br/><br/>
                <RouterLink id="login-link" to="/dashboard"><span id="login">Create Account/Login</span></RouterLink>
            </div>
            <div id="graphs">
                <img class="graph-size" src="@/assets/graph1.jpg">
                <img class="graph-size" src="@/assets/graph2.jpg">
            </div>
        </div>

    </main>
</template>

<style>
    @import '@/assets/base.css';

    #title {
        font-family: main-text;
        font-size: 60px;
        margin-bottom: 25px;
    }

    #description {
        font-family: main-text;
        font-size: 30px;
    }

    #wrapper {
        display: flex;
        flex-direction: row;
    }

    #content {
        margin: 30px 100px 10px 50px;
        flex-grow: 5;
    }

    #graphs {
        flex-grow: 1;
        position: relative;
        margin: 100px 100px 0 0;
        width: 80%
    }

    .graph-size {
        max-width: 100%;
        margin-bottom: 50px;
    }

    #login {
        margin-top: 10px;
        padding: 20px;
        background-color: #DA7777;
        border: none;
        border-radius: 15px;
        font-size: 30px;
    }

    #login-link:link, #login-link:visited, #login-link:hover, #login-link:active{
        color: white;
        text-decoration: none;
        font-family: main-text;
        text-align: center;
    }

</style>