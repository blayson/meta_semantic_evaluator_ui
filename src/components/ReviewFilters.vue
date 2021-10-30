<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar flat dark>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
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

      <v-divider></v-divider>

      <v-chip-group
        v-model="selectedCategories"
        column
        multiple
        @change="onCategorySelected()"
      >
        <v-chip
          filter
          outlined
          v-for="item in categories"
          :key="item.id"
          v-bind:value="item.id"
        >
          {{ item.product_category }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReviewFilters",
  props: ["undoSize", "redoSize"],
  data: () => ({
    dateSort: 0,
    pageSize: 10,
    selectedStatus: [],
    pageSizeItems: [10, 25, 50, 100],
    selectedCategories: [],
  }),
  computed: {
    ...mapState({
      categories: "categories",
      reviewStatus: "reviewStatus",
    }),
  },
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
    onCategorySelected() {
      this.$store.dispatch("setSelectedCategories", this.selectedCategories);
      this.$emit("on-category-selected");
    },
    // onStatusSelected() {
    //   this.$store.dispatch("setSelectedStatus", this.selectedStatus);
    //   this.$emit("on-category-selected");
    // },
  },
  beforeMount() {
    this.$store.dispatch("loadProductCategories");
    this.selectedCategories = this.$store.state.selectedCategories;
  },
};
</script>

<style scoped></style>
