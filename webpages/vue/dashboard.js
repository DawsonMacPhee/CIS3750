import GraphStats from `./GraphStats.vue`;
import GraphDisplay from `./GraphDisplay.vue`;
import SearchFacet from `./SearchFacet.vue`;
import SearchBar from `./SearchBar.vue`;

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