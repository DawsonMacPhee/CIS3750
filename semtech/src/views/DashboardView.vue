<script lang="ts">
    import Sidebar from '@/components/Sidebar.vue';
    import DashboardFilter from '@/components/DashboardFilter.vue';
    import GraphStats from '@/components/GraphStats.vue';
    import Graph from '@/components/Graph.vue';

    export default {
        data() {
            return {
                nodes: [],
                displayedNodes: [],
                uniqueTypes: [],
                search: ""
            }
        },
        beforeMount() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8080/api/user/browse", false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(null);

            this.nodes = JSON.parse(xhr.responseText);
            this.displayedNodes = this.nodes;
        },
        computed: {
            numNodes() {
                var count = 0;
                if (typeof this.displayedNodes[0].data.id == "string") {
                    for (const row of this.displayedNodes) {
                        if (!row.data.id.includes("r")) {
                            count++;
                        }
                    }
                }
                
                return count;
            },
            numUnique() {
                var count = 0;
                if (typeof this.displayedNodes[0].data.id == "string") {
                    for (const row of this.displayedNodes) {
                        if (!row.data.id.includes("r") && !this.uniqueTypes.includes(row.data.type)) {
                            this.uniqueTypes.push(row.data.type);
                            count++;
                        }
                    }
                }

                return count;
            },
            numRel() {
                var count = 0;
                if (typeof this.displayedNodes[0].data.id == "string") {
                    for (const row of this.displayedNodes) {
                        if (row.data.id.includes("r")) {
                            count++;
                        }
                    }
                }

                return count;
            }      
        },
        methods: {
            applySearch() {
                if (this.search == "") {
                    this.displayedNodes = this.nodes;
                } else {
                    this.displayedNodes = [];
                    console.log(this.displayedNodes);
                }

                for (const row of this.displayedNodes) {

                }
            }
        },
        components: {
            Sidebar,
            DashboardFilter,
            GraphStats,
            Graph
        }
    }
</script>

<template>
    <main>
        <img class="logo" src="@/assets/main_icon.png">
        <div id="dashboard-wrapper">
            <Sidebar />
            <div id="dashboard-content">
                <h1 class="content-title"><b>Dashboard</b> ~ Search and Browse Data</h1>

                <div id="dashboard-container">
                    <div id="dashboard-info">
                        <DashboardFilter />
                        <GraphStats :nodes="numNodes" :unique="numUnique" :relations="numRel"/>
                    </div>
                    <div id="dashboard-graph">
                        <input id="searchbar" type="text" v-model="search" v-on:keyup="applySearch()" placeholder="Search..."/>
                        <Graph :node-info="displayedNodes" />
                    </div>
                </div>
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

    #dashboard-content {
        width: calc(100vw - 250px);
    }

    #dashboard-container {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        width: 80%;
        height: 80%;
        margin-left: 10%;
    }

    #dashboard-info {
        display: flex;
        flex-direction: column;
        width: 30%;
    }

    #dashboard-graph {
        width: 100%;
    }

    #searchbar {
        width: 100%;
        font-size: 20px;
        padding: 5px;
        font-family: main-text;
        box-sizing: border-box;
    }

</style>