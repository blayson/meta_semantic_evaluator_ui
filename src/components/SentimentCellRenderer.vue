<template>
  <div v-if="value !== undefined">
    <v-chip :color="getColor(params.value)" dark small>{{ value }}</v-chip>
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
    focusIn() {
      return false;
    },
    /* Component Editor Lifecycle methods */
    // the final value to send to the grid, on completion of editing
    getValue() {
      // this simple editor doubles any value entered into the input
      return this.value * 2;
    },

    // Gets called once before editing starts, to give editor a chance to
    // cancel the editing before it even starts.
    isCancelBeforeStart() {
      return false;
    },

    // Gets called once when editing is finished (eg if Enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    isCancelAfterEnd() {
      // our editor will reject any value greater than 1000
      return this.value > 1000;
    },
  },
  mounted() {
    this.value = this.params.value;
    // Vue.nextTick(() => this.$refs.input.focus());
  },
});
</script>

<style scoped></style>
