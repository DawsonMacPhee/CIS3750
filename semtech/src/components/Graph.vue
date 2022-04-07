<script lang="ts">
    import { onMounted } from 'vue';
    import cytoscape from 'cytoscape';
    import fcose from 'cytoscape-fcose';

    export default {
        data() {
            return {
                cy: {},
                layout: {}
            }
        },
        props: {
            nodeInfo: Object
        },
        watch: { 
      	    nodeInfo: function(newVal, oldVal) {
                console.log(newVal);
                this.cy.json({ elements: newVal });
                this.cy.layout({
                    name: 'fcose',
                    idealEdgeLength: 250
                }).run();
            }
        },
        mounted() {
            cytoscape.use(fcose);
            this.cy = cytoscape({
                container: document.getElementById('graph-container') ,

                elements: this.nodeInfo,

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
                    idealEdgeLength: 250
                },
            });
        }
    }
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