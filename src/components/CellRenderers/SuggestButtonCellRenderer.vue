<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn elevation="1" small tile loading disabled></v-btn>
    </div>
    <div v-else>
      <v-btn
        @click="submitSuggestion()"
        :color="isDataUpdated() ? 'primary' : 'accent'"
        elevation="1"
        small
        ><v-icon>mdi-check</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {
      cellValue: null,
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
      return this.cellValue !== undefined;
    },

    isDataUpdated() {
      const updatableCols = ["sentiment", "product", "feature"];
      let updated = false;
      if (this.updatedDataHistory !== null) {
        for (const col of updatableCols) {
          if (col in this.updatedDataHistory) {
            if (
              this.updatedDataHistory[col].newValue !==
              this.$store.getters.getInitialRowData(this.cellValue, col)
            )
              updated = true;
            break;
          }
        }
      }
      return updated;
    },

    async submitSuggestion() {
      const id_arr = this.cellValue.split("|");
      const [review_id, feature_id] = id_arr;

      let updatedData = this.$store.getters.getUpdatedDataHistory(
        this.params.node.rowIndex
      );

      if (!this.isDataUpdated()) {
        await this.$store.dispatch("submitNoSuggestions", {
          review_id,
          feature_id,
        });
        alert("Data approved");
        return;
      }

      await this.$store.dispatch("submitSuggestions", {
        review_id,
        feature_id,
        ...updatedData,
      });

      await this.params.api.refreshInfiniteCache();

      this.params.context.componentParent.methodFromParent(
        this.params.node.rowIndex
      );
    },

    // gets called whenever the user gets the cell to refresh
    refresh(params) {
      // set value into cell again
      this.cellValue = this.getValueToDisplay(params);
    },

    getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    },
  },

  beforeMount() {
    // this.params contains the cell & row information and is made available to this component at creation time
    // see ICellRendererParams below for more details
    this.cellValue = this.getValueToDisplay(this.params);
  },
});
</script>

<style scoped></style>
