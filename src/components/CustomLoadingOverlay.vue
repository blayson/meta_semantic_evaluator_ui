<template>
  <div
    v-if="!valueExist()"
    class="ag-custom-loading-cell"
    style="padding-left: 10px; line-height: 25px"
  >
    <v-progress-circular indeterminate color="purple"></v-progress-circular>
  </div>
  <div v-else>{{ cellValue }}</div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "CustomLoadingOverlay",
  data: function () {
    return {
      cellValue: null,
    };
  },
  methods: {
    valueExist() {
      return this.cellValue !== undefined;
    },
  },
  mounted() {
    this.cellValue = this.params.value;
  },
});
</script>

<style scoped></style>
