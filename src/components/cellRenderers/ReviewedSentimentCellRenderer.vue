<template>
  <div v-if="value.old !== undefined">
    <div v-if="value.new !== undefined && value.new !== null">
      <v-chip :color="getColor(value.old)" dark x-small>{{
        value.old
      }}</v-chip>
      <span><v-icon x-small>mdi-arrow-right</v-icon></span>
      <v-chip :color="getColor(value.new)" dark x-small>{{
        value.new
      }}</v-chip>
    </div>
    <div v-else>
      <v-chip :color="getColor(value.old)" dark x-small>{{
        value.old
      }}</v-chip>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      value: null,
      newValue: null,
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
