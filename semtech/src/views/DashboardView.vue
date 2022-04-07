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
                filteredNodes: [],
                uniqueTypes: [],
                filteredIds: [],
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
            this.filteredNodes = this.displayedNodes;
        },
        computed: {
            numNodes() {
                var count = 0;
                if (this.displayedNodes.length != 0 && typeof this.displayedNodes[0].data.id == "string") {
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
                this.uniqueTypes = [];
                if (this.displayedNodes.length != 0 && typeof this.displayedNodes[0].data.id == "string") {
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
                if (this.displayedNodes.length != 0 && typeof this.displayedNodes[0].data.id == "string") {
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
                var _this = this;
                this.filteredIds = [];

                if (this.search == "") {
                    this.displayedNodes = this.nodes;
                    this.filteredNodes = this.displayedNodes;
                }

                var results = this.nodes.filter(function(value){ 
                    if (!value.data.id.includes("r") && value.data.label.toLowerCase().includes(_this.search.toLowerCase())){
                        _this.filteredIds.push(value.data.id);
                        return true;
                    } else if (value.data.id.includes("r")) {
                        return true;
                    }
                    return false;
                });

                var results = results.filter(function(value){ 
                    if (value.data.id.includes("r")){
                        if (_this.filteredIds.includes(value.data.source) && _this.filteredIds.includes(value.data.target)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                });

                this.displayedNodes = results;
                this.filteredNodes = this.displayedNodes;
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
                        <DashboardFilter :node-info="filteredNodes" />
                        <GraphStats :nodes="numNodes" :unique="numUnique" :relations="numRel"/>
                    </div>
                    <div id="dashboard-graph">
                        <input id="searchbar" type="text" v-model="search" v-on:keyup.enter="applySearch()" placeholder="Search..."/>
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