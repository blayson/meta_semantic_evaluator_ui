<template>
  <div class="ag-overlay-loading-center" style="background-color: lightcoral">
    <i class="far fa-frown"> {{ params.noRowsMessageFunc() }}</i>
  </div>
</template>

<script>
export default {
  name: "CustomNoRowsOverlay",
};
</script>

<style scoped></style>
