<template>
  <div>
    <div v-if="!valueExist()">
      <v-btn small icon loading disabled></v-btn>
    </div>
    <div v-else>
      <v-btn
        @click="approveSuggestion()"
        color="primary"
        small
        icon
        plain
        style="margin-left: 5px"
        ><v-icon>mdi-check</v-icon></v-btn
      >
      <v-btn
        @click="rejectSuggestion()"
        color="red"
        small
        icon
        plain
        style="margin-right: 5px"
        ><v-icon>mdi-window-close</v-icon></v-btn
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

  methods: {
    valueExist() {
      return this.cellValue !== undefined;
    },

    async rejectSuggestion() {
      await this.$store.dispatch("rejectSuggestion", this.cellValue);

      await this.params.api.refreshInfiniteCache();
      this.params.context.componentParent.showNotification(
        `Rejected  suggestion with id ${this.cellValue}`,
        true
      );
    },

    async approveSuggestion() {
      await this.$store.dispatch("approveSuggestion", this.cellValue);

      await this.params.api.refreshInfiniteCache();
      this.params.context.componentParent.showNotification(
        `Approved suggestion with id: ${this.cellValue}`,
        true
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
