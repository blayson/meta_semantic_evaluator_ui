<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn elevation="1" small tile loading disabled>Check</v-btn>
    </div>
    <div v-else>
      <v-btn
        @click="invokeParentMethod()"
        color="accent"
        elevation="1"
        small
        tile
        >Check</v-btn
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
  methods: {
    valueExist() {
      return this.cellValue !== undefined;
    },

    getColor(sentiment) {
      if (sentiment === "positive") return "green";
      else return "red";
    },

    invokeParentMethod() {
      // `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`;

      this.params.context.componentParent.methodFromParent();
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
