<script setup lang="ts">
    import { onMounted } from 'vue';
    import cytoscape from 'cytoscape';
    import fcose from 'cytoscape-fcose';

    onMounted(() => {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/api/user/browse", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            cytoscape.use(fcose);
            var cy = cytoscape({
                container: document.getElementById('graph-container') ,

                elements: JSON.parse(this.responseText),

                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#91A7DE',
                            'width': '60px',
                            'height': '60px',
                            'label': 'data(label)',
                            'color': 'white'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': 'black',
                            'target-arrow-color': 'black',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'label': 'data(label)',
                            'edge-text-rotation': 'autorotate',
                            'text-margin-y': '-12px',
                            'color': 'white'
                        }
                    }
                ],

                layout: {
                    name: 'fcose',
                    idealEdgeLength: 300
                },
            });   
        }
    });
</script>

<template>
    <div id="graph-container"></div>
</template>

<style>
    @import '@/assets/base.css';

    #graph-container {
        width: 100%;
        height: calc(100% - 37px);
        background-color: #9E9E9E;
    }
</style>