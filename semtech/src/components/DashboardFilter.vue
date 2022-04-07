<script lang="ts">
    export default {
        data() {
            return {
                filterVal: "",
                filteredIds: []
            }
        },
        props: {
            nodeInfo: Object
        },
        watch: { 
      	    filterVal: function(newVal, oldVal) {
                this.filterGraph();
            },
            nodeInfo: function(newVal, oldVal) {
                this.filterGraph();
            }
        },
        methods: {
            filterGraph() {

                if (this.filterVal == "") {
                    this.$parent.displayedNodes = this.nodeInfo;
                    return;
                }

                var _this = this;
                this.filteredIds = [];

                var results = this.nodeInfo.filter(function(value){ 
                    if (!value.data.id.includes("r") && value.data.type == _this.filterVal){
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

                this.$parent.displayedNodes = results;
            }
        }
    }
</script>

<template>
    <div id="filter-container">
        <h1 id="filter-title">Filters</h1>

        <input type="radio" id="cases" value="Case" v-model="filterVal">
        <label class="filter-info" for="cases">Cases</label><br/>

        <input type="radio" id="parties" value="Party" v-model="filterVal">
        <label class="filter-info" for="parties">Parties</label><br/>

        <input type="radio" id="judges" value="Judge" v-model="filterVal">
        <label class="filter-info" for="judges">Judges</label><br/>

        <input type="radio" id="attorneys" value="Attorney" v-model="filterVal">
        <label class="filter-info" for="attorneys">Attorneys</label>
    </div>
</template>

<style>
    @import '@/assets/base.css';

    #filter-container {
        width: 100%;
        height: 50%;
        background-color: #C4C4C4;
        padding-left: 20px;
    }

    #filter-title {
        font-family: main-text;
        text-decoration: underline;
    }

    .filter-info {
        font-family: main-text;
        font-size: 20px;
    }

    input[type="radio"] {
        -ms-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }

</style>