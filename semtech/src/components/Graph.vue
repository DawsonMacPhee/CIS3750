<script setup lang="ts">
    import { onMounted } from 'vue'
    import cytoscape from 'cytoscape'

    onMounted(() => {
        var cy = cytoscape({
            container: document.getElementById('graph-container') ,

            elements: [ // list of graph elements to start with
                { // node a
                data: { id: 'a' }
                },
                { // node b
                data: { id: 'b' }
                },
                { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
                }
            ],

            style: [ // the stylesheet for the graph
                {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
                },

                {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
                }
            ]
        });
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
        background-color: #C4C4C4;
    }
</style>