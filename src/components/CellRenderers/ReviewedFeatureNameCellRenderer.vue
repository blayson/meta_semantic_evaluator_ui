<template>
  <div v-if="value.old !== null">
    <div v-if="value.new !== null">
      <span>{{
        value.old
      }}</span>
      <span><v-icon x-small>mdi-arrow-right</v-icon></span>
      <span>{{
        value.new
      }}</span>
    </div>
    <div v-else>
      <span>{{
        value.old
      }}</span>
    </div>
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
    getValue() {
      return this.value;
    },

    isCancelBeforeStart() {
      return false;
    },

    isCancelAfterEnd() {
      return this.value;
    },
  },
  mounted() {
    this.value = this.params.value;
  },
};
</script>

<style scoped></style>
