<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="reviews"
      :expanded.sync="expanded"
      item-key="id"
      @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
    >
      <template v-slot:item.feature="props">
        <v-edit-dialog
          :return-value.sync="props.item.feature"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.feature }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.feature"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.sentiment="props">
        <v-edit-dialog
          :return-value.sync="props.item.iron"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.iron }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Update Iron</div>
            <v-text-field
              v-model="props.item.iron"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.sentiment="{ item }">
        <v-chip :color="getColor(item.sentiment)" dark>
          {{ item.sentiment }}
        </v-chip>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.product }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReviewTable",
  components: {},
  props: {
    args: String,
  },
  methods: {
    getColor(sentiment) {
      if (sentiment === "positive") return "green";
      else return "red";
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    setTab(tab) {
      this.$store.dispatch("setTab", tab);
    },
  },
  beforeMount() {
    this.$store.dispatch("setTab", "notReviewed");
  },
  async mounted() {
    if (this.status.reviews.tab === 1) {
      await this.$store.dispatch("loadReviews", this.pagination);
    }
  },
  computed: mapState(["reviews", "status", "reviewsPagination"]),
  data() {
    return {
      currentTab: 2,
      max25chars: (v) => v.length <= 25 || "Input too long!",
      pagination: {
        page: 0,
        limit: 100,
      },
      expanded: [],
      singleExpand: false,
      headers: [
        { text: "Feature", value: "feature", sortable: true, align: "start" },
        { text: "Sentiment", value: "sentiment", sortable: true },
        { text: "Product", value: "product_name", sortable: true },
        { text: "Review", value: "text", sortable: true, width: "50%" },
        { text: "Checked", value: "checked", sortable: false },
      ],
    };
  },
};
</script>
