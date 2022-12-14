<template>
  <div v-if="value !== undefined && value !== null">
    <v-row dense>
      <v-col
        v-if="
          'sentiment' in value &&
          value.sentiment !== undefined &&
          value.sentiment !== null &&
          value.sentiment.new_value !== null
        "
        cols="12" sm="8" md="5"
      >
        <v-chip
          :color="getColor(value.sentiment.old_value)"
          dark
          x-small
          style="font-size: 12px !important"
          >{{ value.sentiment.old_value }}</v-chip
        >
        <span><v-icon x-small>mdi-arrow-right</v-icon></span>
        <v-chip
          :color="getColor(value.sentiment.new_value)"
          dark
          x-small
          style="font-size: 12px !important"
          >{{ value.sentiment.new_value }}</v-chip
        >
      </v-col>
      <v-col
        v-if="
          'feature' in value &&
          value.feature !== undefined &&
          value.feature !== null &&
          value.feature.new_value !== null
        "
        cols="12" sm="8" md="6"
      >
        <span style="font-size: 12px !important">{{
          value.feature.old_value
        }}</span>
        <span style="font-size: 10px !important"
          ><v-icon x-small>mdi-arrow-right</v-icon></span
        >
        <span style="font-size: 12px !important">{{
          value.feature.new_value
        }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: function () {
    return {
      value: null,
      visible: false,
    };
  },
  methods: {
    getColor(sentiment) {
      if (sentiment === "positive") return "green";
      else return "red";
    },

    /* Component Editor Lifecycle methods */
    // the final value to send to the grid, on completion of editing
    getValue() {
      // this simple editor doubles any value entered into the input
      return this.value;
    },
  },
  mounted() {
    this.value = this.params.value;
    // Vue.nextTick(() => this.$refs.input.focus());
  },
});
</script>

<style scoped></style>
