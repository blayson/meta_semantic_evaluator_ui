<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn elevation="1" small tile loading disabled></v-btn>
    </div>
    <div v-else-if="isDataUpdated()">
      <v-btn @click="invokeParentMethod()" color="primary" elevation="1" small
        ><v-icon>mdi-check</v-icon></v-btn
      >
    </div>
    <div v-else>
      <v-btn @click="invokeParentMethod()" color="accent" elevation="1" small
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
      cellChanges: false,
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

    invokeParentMethod() {
      // `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`;
      const id_arr = this.cellValue.split("|");
      const [review_id, feature_id] = id_arr;

      let updatedData = this.$store.getters.getUpdatedDataHistory(
        this.params.node.rowIndex
      );

      if (!this.isDataUpdated()) {
        alert("There is no updated data in this row");
        // this.$store.dispatch("submitUpdates", {
        //   review_id,
        //   feature_id,
        //   ...updatedData,
        // });
        return;
      }

      this.$store.dispatch("submitUpdates", {
        review_id,
        feature_id,
        ...updatedData,
      });

      this.params.api.refreshInfiniteCache();

      console.log("updated data: " + updatedData);
      console.log("review data: " + review_id);
      console.log("feature data: " + feature_id);

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
