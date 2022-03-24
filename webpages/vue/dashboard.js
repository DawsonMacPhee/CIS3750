import GraphStats from `./graph-stats.vue`;
import GraphDisplay from `./graph-display.vue`;
import SearchFacet from `./search-facet.vue`;
import SearchBar from `./search-bar.vue`;

const app = Vue.createApp({
    data() {
        return {

        }
    },


    methods: {

    }
});

app
  .component('graph-stats', GraphStats)
  .component('graph-display', GraphDisplay)
  .component('search-fact', SearchFacet)
  .component('search-bar', SearchBar);