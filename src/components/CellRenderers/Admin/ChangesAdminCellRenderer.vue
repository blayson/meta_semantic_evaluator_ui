<template>
  <div v-if="value !== undefined && value !== null">
    <v-chip :color="getColor(value.sentiment.old_value)" dark small>{{
      value.sentiment.old_value
    }}</v-chip>
    <span><v-icon>mdi-arrow-right</v-icon></span>
    <v-chip :color="getColor(value.sentiment.new_value)" dark small>{{
      value.sentiment.new_value
    }}</v-chip>
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
