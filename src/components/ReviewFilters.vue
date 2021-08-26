<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar flat color="deep-purple accent-4" dark>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <h2 class="text-h6 mb-2">Settings</h2>
      <v-select
        @change="onPageSizeChanged()"
        id="page-size"
        :items="pageSizeItems"
        v-model="pageSize"
        label="Page size"
      >
      </v-select>
      <v-btn
        v-if="undoSize < 1"
        text
        small
        disabled
        id="undoBtn"
        class="undo-btn"
        >Undo</v-btn
      >
      <v-btn
        v-else
        color="red"
        small
        text
        @click="undo()"
        id="undoBtn"
        class="undo-btn"
        >Undo</v-btn
      >
      <v-btn
        v-if="redoSize < 1"
        text
        small
        disabled
        id="undoBtn"
        class="undo-btn"
        >Redo</v-btn
      >
      <v-btn
        v-else
        color="green"
        small
        text
        @click="redo()"
        id="undoBtn"
        class="undo-btn"
        >Redo</v-btn
      >
    </v-card-text>

    <v-card-text>
      <h2 class="text-h6 mb-2">Filters</h2>

      <v-chip-group v-model="dateSort" column @change="onDateSortChanged()">
        <v-chip filter outlined> Newest first </v-chip>
        <v-chip filter outlined> Oldest first </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ReviewFilters",
  props: ["undoSize", "redoSize"],
  data: () => ({
    dateSort: 0,
    pageSize: 10,
    pageSizeItems: [10, 25, 50, 100],
  }),
  methods: {
    onPageSizeChanged() {
      this.$emit("on-page-size-changed", this.pageSize);
    },
    onDateSortChanged() {
      this.$emit("on-date-sort-changed", this.dateSort);
    },
    undo() {
      this.$emit("undo");
    },
    redo() {
      this.$emit("redo");
    },
  },
};
</script>

<style scoped></style>
