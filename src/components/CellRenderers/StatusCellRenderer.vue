<template>
  <div v-if="value !== undefined">
    <v-chip :color="getColor(params.value)" dark small>{{ value }}</v-chip>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      value: null,
      visible: false,
    };
  },
  methods: {
    getColor(status) {
      if (status === "pending") return "grey";
      else if (status === "approved") return "green";
      else if (status === "rejected") return "orange";
      else return "grey";
    },

    /* Component Editor Lifecycle methods */
    // the final value to send to the grid, on completion of editing
    getValue() {
      // this simple editor doubles any value entered into the input
      return this.value;
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
      return this.value;
    },
  },
  mounted() {
    this.value = this.params.value;
    // Vue.nextTick(() => this.$refs.input.focus());
  },
};
</script>

<style scoped></style>
