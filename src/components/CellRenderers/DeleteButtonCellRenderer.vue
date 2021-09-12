<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn elevation="1" small tile loading disabled></v-btn>
    </div>
    <div v-else-if="this.params.node.data.status === 'pending'">
      <v-btn @click="deleteSuggestion()" color="red" elevation="1" small dark
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {
      suggestionsId: null,
    };
  },
  computed: {
    updatedDataHistory() {
      return this.$store.getters.getUpdatedDataHistory(
        this.params.node.rowIndex
      );
    },
  },
  methods: {
    valueExist() {
      return this.suggestionsId !== undefined;
    },

    deleteSuggestion() {
      // `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`;
      const id_arr = this.params.node.data.id.split("|");
      const [review_id, feature_id] = id_arr;
      const suggestions_id = this.suggestionsId;

      this.$store.dispatch("deleteSuggestions", {
        review_id,
        feature_id,
        suggestions_id,
      });

      this.params.api.refreshInfiniteCache();
      alert("deleted: " + suggestions_id);
    },

    // gets called whenever the user gets the cell to refresh
    refresh(params) {
      // set value into cell again
      this.suggestionsId = this.getValueToDisplay(params);
    },

    getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    },
  },

  beforeMount() {
    // this.params contains the cell & row information and is made available to this component at creation time
    // see ICellRendererParams below for more details
    this.suggestionsId = this.getValueToDisplay(this.params);
    // console.log(this.params.node.data.status);
  },
});
</script>

<style scoped></style>
