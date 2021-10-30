<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn small icon loading disabled></v-btn>
    </div>
    <div v-else>
      <v-btn
        @click="deleteSuggestion()"
        color="red"
        fab
        plain
        :disabled="!isStatusPending()"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { statusMap } from "@/helpers/constants";

export default Vue.extend({
  data: function () {
    return {
      suggestionsId: null,
    };
  },
  computed: {},
  methods: {
    valueExist() {
      return this.suggestionsId !== undefined;
    },

    isStatusPending() {
      console.log(this.params.node.data.status);
      return this.params.node.data.status.toUpperCase() === statusMap.pending;
    },

    async deleteSuggestion() {
      // `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`;
      const id_arr = this.params.node.data.id.split("|");
      const [review_id, feature_id] = id_arr;
      const suggestions_id = this.suggestionsId;

      await this.$store.dispatch("deleteSuggestions", {
        review_id,
        feature_id,
        suggestions_id,
      });

      await this.params.api.refreshInfiniteCache();
      this.params.context.componentParent.showNotification("Deleted", true);
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
