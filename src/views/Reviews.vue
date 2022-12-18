<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col md="2">
        <ReviewFilters
          :redo-size="redoSize"
          :undo-size="undoSize"
          @on-page-size-changed="onPageSizeChanged"
          @undo="undo"
          @redo="redo"
          @on-date-sort-changed="onDateSortChanged"
          @on-category-selected="onCategorySelected"
        ></ReviewFilters>
      </v-col>
      <v-col md="10">
        <v-container>
          <v-row no-gutters>
            <v-col md="9">
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="primary"
                grow
                cols="3"
                md="3"
              >
                <v-tab
                  v-for="item in tabs"
                  :key="item.id"
                  v-on:click="setTab(item)"
                >
                  {{ item.name }}
                </v-tab>
              </v-tabs>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="example-wrapper">
                <ag-grid-vue
                  style="height: 100%"
                  class="ag-theme-material"
                  :columnDefs="columnDefs"
                  :gridOptions="gridOptions"
                  @grid-ready="onGridReady"
                  :defaultColDef="defaultColDef"
                  :rowModelType="rowModelType"
                  :paginationPageSize="paginationPageSize"
                  :cacheOverflowSize="cacheOverflowSize"
                  :maxConcurrentDatasourceRequests="
                    maxConcurrentDatasourceRequests
                  "
                  :infiniteInitialRowCount="infiniteInitialRowCount"
                  :maxBlocksInCache="maxBlocksInCache"
                  :pagination="true"
                  :getRowNodeId="getRowNodeId"
                  :cacheBlockSize="cacheBlockSize"
                  @cell-value-changed="onCellValueChanged"
                  :context="context"
                  :undoRedoCellEditing="undoRedoCellEditing"
                  :undoRedoCellEditingLimit="undoRedoCellEditingLimit"
                  :enableCellChangeFlash="true"
                  @first-data-rendered="onFirstDataRendered"
                  domLayout="autoHeight"
                >
                </ag-grid-vue>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      <v-icon v-if="done" small color="green">mdi-check</v-icon>
      <v-icon v-else small color="red">mdi-close</v-icon>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { AgGridVue } from "ag-grid-vue";
import SentimentCellRenderer from "@/components/cellRenderers/SentimentCellRenderer";
import ReviewedSentimentCellRenderer from "@/components/cellRenderers/ReviewedSentimentCellRenderer.vue";
import ReviewFilters from "@/components/ReviewFilters";
import { applyFilters, applySort } from "@/helpers/utils";
import { HISTORY_SIZE } from "@/helpers/constants";
import {
  ADMIN_COLS,
  DEFAULT_COL_DEFS,
  getNotReviewedCols,
  REVIEWED_COLS,
  REVIEWED_DEF_COL_DEFS,
} from "@/helpers/columnDefs";
import StatusCellRenderer from "@/components/cellRenderers/StatusCellRenderer";
import ReviewedFeatureNameCellRenderer from "@/components/cellRenderers/ReviewedFeatureNameCellRenderer.vue";

export default {
  name: "Reviews",

  components: {
    AgGridVue,
    ReviewFilters,
    // eslint-disable-next-line vue/no-unused-components
    SentimentCellRenderer,
    // eslint-disable-next-line vue/no-unused-components
    StatusCellRenderer,
    // eslint-disable-next-line vue/no-unused-components
    ReviewedSentimentCellRenderer,
    // eslint-disable-next-line vue/no-unused-components
    ReviewedFeatureNameCellRenderer,
  },

  computed: {
    ...mapState({
      selectedProductCategories: "selectedCategories",
      selectedReviewStatusTab: "selectedReviewStatusTab",
      selectedStatus: "selectedStatus",
      featureNames: "featureNames",
    }),

    currentUser() {
      return this.$store.state.status.auth.user;
    },
  },

  data() {
    return {
      gridOptions: null,
      cacheBlockSize: null,
      rowBuffer: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      rowSelection: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
      getRowNodeId: null,

      components: {
        SentimentCellRenderer,
        StatusCellRenderer,
      },

      undoRedoCellEditing: null,
      undoRedoCellEditingLimit: null,
      context: null,

      args: 0,
      tab: null,
      userTabs: [
        {
          name: "Not Reviewed",
          id: "notReviewed",
          rowIdGetter() {
            return (data) => data.id;
          },
        },
        {
          name: "Reviewed",
          id: "reviewed",
          rowIdGetter() {
            return (data) => data.suggestions_id;
          },
        },
      ],
      adminTabs: [
        {
          name: "Not Reviewed",
          id: "notReviewed",
          rowIdGetter() {
            return (data) => data.id;
          },
        },
        {
          name: "Reviewed",
          id: "reviewed",
          rowIdGetter() {
            return (data) => data.suggestions_id;
          },
        },
        {
          name: "For approve",
          id: "forApprove",
          rowIdGetter() {
            return (data) => data.reviews_suggestions_id;
          },
        },
      ],
      tabs: [],
      undoSize: 0,
      redoSize: 0,
      // Notification
      snackbar: false,
      timeout: 2000,
      text: "",
      done: true,
    };
  },

  methods: {
    getRowHeight(data) {
      let height = 50;
      if ("changes" in data && Object.keys(data.changes).length === 2) {
        height = 80;
      }
      return height;
    },

    showNotification(text, done) {
      this.done = done;
      this.text = text;
      this.snackbar = true;
    },

    isUserAdmin() {
      return (
        this.currentUser.user.user_roles_id === 2 ||
        this.currentUser.user.user_roles_id === 3
      );
    },

    onPageSizeChanged(newPageSize) {
      this.gridApi.paginationSetPageSize(newPageSize);
    },

    onDateSortChanged(dateSort) {
      if (this.columnApi.getColumn("suggestion_time") !== null) {
        this.columnApi.applyColumnState({
          state: [
            {
              colId: "suggestion_time",
              sort: dateSort === 1 ? "asc" : "desc",
            },
          ],
        });
        return;
      }
      this.columnApi.applyColumnState({
        state: [
          {
            colId: "published_at",
            sort: dateSort === 1 ? "asc" : "desc",
          },
        ],
      });
    },

    onCategorySelected() {
      this.gridApi.onFilterChanged();
    },

    onFirstDataRendered(params) {
      this.undoSize = 0;
      this.redoSize = 0;
      params.api.sizeColumnsToFit();
    },

    onCellValueChanged(params) {
      this.undoSize = params.api.getCurrentUndoSize();
      this.redoSize = params.api.getCurrentRedoSize();
    },

    undo() {
      this.$store.commit("UNDO_LAST_UPDATE");
      this.gridApi.undoCellEditing();
    },

    redo() {
      this.$store.commit("REDO_LAST_UPDATE");
      this.gridApi.redoCellEditing();
    },

    getColDefs() {
      switch (this.selectedReviewStatusTab.id) {
        case "notReviewed": {
          // console.log(this.featureNames);
          return getNotReviewedCols(this.featureNames);
        }
        case "reviewed": {
          return REVIEWED_COLS;
        }
        case "forApprove": {
          return ADMIN_COLS;
        }
      }
    },

    async setTab(tab) {
      this.$store.commit("SET_TAB", tab);
      await this.gridApi.setColumnDefs(this.getColDefs());

      this.getRowNodeId = tab.rowIdGetter();

      this.gridApi.sizeColumnsToFit();
      this.gridApi.onFilterChanged();
    },

    // var colId = params.column.getId();
    // console.log(params);
    // const par = { columns: ["button"] };
    // const instances = this.gridApi.getCellRendererInstances(par);
    // instances.forEach((instance) => {
    //   if (instance.getFrameworkComponentInstance) {
    //     instance.getFrameworkComponentInstance().setChanged(true);
    //   } else {
    //     instance.setChanged(true);
    //   }
    // });
    // params.api.refreshCells();
    // if (colId === "sentiment") {
    // var selectedCountry = params.data.country;
    // var selectedCity = params.data.city;
    // var allowedCities = countyToCityMap(selectedCountry);
    // var cityMismatch = allowedCities.indexOf(selectedCity) < 0;
    // if (cityMismatch) {
    //   params.node.setDataValue("city", null);
    // }
    // }

    async onGridReady(params) {
      const getSelectedCategories = () => {
        return this.selectedProductCategories;
      };

      const getSelectedReviewStatusTab = () => {
        return this.selectedReviewStatusTab.id;
      };

      const updateData = () => {
        return this.updateRowData();
      };

      const getTotal = () => {
        return this.$store.getters.getTotal;
      };
      const getData = async (payload) => {
        await this.$store.dispatch("loadReviews", payload);
      };

      const getAdminData = async (payload) => {
        await this.$store.dispatch("loadForApprove", payload);
      };

      const showNotification = (text, done) => {
        this.showNotification(text, done);
      };

      const nullifyUndoRedo = () => {
        this.redoSize = 0;
        this.undoSize = 0;
        this.$store.commit("NULLIFY_UNDO_REDO");
      };

      nullifyUndoRedo();
      this.columnApi.autoSizeColumns();

      let dataSource = {
        rowCount: null,

        getRows: async function (params) {
          nullifyUndoRedo();
          const currentTab = getSelectedReviewStatusTab();
          const sortParams = applySort(params.sortModel);
          const filterParams = applyFilters(
            params.filterModel,
            getSelectedCategories(),
            currentTab
          );
          if (currentTab === "forApprove") {
            await getAdminData({
              start: params.startRow,
              end: params.endRow,
              sort: sortParams,
              filter: filterParams,
            });
          } else if (
            currentTab === "notReviewed" ||
            currentTab === "reviewed"
          ) {
            await getData({
              start: params.startRow,
              end: params.endRow,
              sort: sortParams,
              filter: filterParams,
            });
          }

          // Get total count of rows (returns "100" in this example)
          const totalCount = getTotal();
          if (totalCount === 0) {
            showNotification("No data", false);
            params.failCallback();
          }
          // Get the rows in this batch
          const rowsThisPage = updateData();
          // If number of rows > 100, set lastRow = 100
          // otherwise set it to -1 and continue loading when scrolling down
          let lastRow = params.endRow >= totalCount ? totalCount : -1;
          // Tell the grid we got our rows ready
          params.successCallback(rowsThisPage, lastRow);
        },
      };

      params.api.setDatasource(dataSource);
    },

    updateRowData() {
      return Object.freeze(this.copyRowData(this.$store.getters.allReviews));
    },

    copyRowData(data) {
      return data.map((item) => {
        return {
          ...item,
        };
      });
    },
  },

  async beforeMount() {
    const commit = (mutation, payload) => {
      this.$store.commit(mutation, payload);
    };

    const getInitialRowData = (dataId) => {
      return this.$store.getters.getInitialRowData(dataId);
    };

    const getColumnValue = (colId, node) => {
      const val = this.gridApi.getValue(this.columnApi.getColumn(colId), node);
      if (typeof val === "string" || val instanceof String) {
        return val;
      } else {
        return val.label;
      }
    };

    this.gridOptions = {
      onCellEditingStopped: function (event) {
        console.log("cellEditingStopped");
        let notUpdatedVal = null;
        const colId = event.column.getId();

        if (colId !== "feature") {
          notUpdatedVal = getColumnValue("feature", event);
        } else if (colId !== "sentiment") {
          notUpdatedVal = getColumnValue("sentiment", event);
        }

        let payload = {
          index: event.rowIndex,
        };

        if (colId === "feature") {
          if (
            typeof event.oldValue === "string" ||
            event.oldValue instanceof String
          ) {
            payload[colId] = {
              oldValue: event.oldValue,
            };
          } else {
            payload[colId] = {
              oldValue: event.oldValue.label,
            };
          }

          payload[colId]["newValue"] = event.newValue.label;
        } else if (colId === "sentiment") {
          payload[colId] = {
            oldValue: event.oldValue,
            newValue: event.newValue,
          };
        }

        if (colId !== "feature") {
          payload["feature"] = {
            oldValue: notUpdatedVal,
            newValue: notUpdatedVal,
            initialValue: getInitialRowData(event.node.data.id)["feature"],
          };
        } else if (colId !== "sentiment") {
          payload["sentiment"] = {
            oldValue: notUpdatedVal,
            newValue: notUpdatedVal,
            initialValue: getInitialRowData(event.node.data.id)["sentiment"],
          };
        }

        payload[colId]["initialValue"] = getInitialRowData(event.node.data.id)[
          colId
        ];

        commit("SAVE_CELL_UPDATES", payload);
      },
    };

    this.defaultColDef =
      this.selectedReviewStatusTab.id === "notReviewed"
        ? DEFAULT_COL_DEFS
        : REVIEWED_DEF_COL_DEFS;

    this.columnDefs = this.getColDefs();

    this.rowModelType = "infinite";
    this.cacheBlockSize = 100;
    this.paginationPageSize = 10;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 50;
    this.maxBlocksInCache = 10;
    this.rowBuffer = 0;
    this.undoRedoCellEditing = true;
    this.undoRedoCellEditingLimit = HISTORY_SIZE;

    this.getRowNodeId = this.selectedReviewStatusTab.rowIdGetter();
    this.context = { componentParent: this };
  },

  async mounted() {
    this.gridApi = this.gridOptions.api;
    this.columnApi = this.gridOptions.columnApi;

    if (this.isUserAdmin()) {
      this.tabs = this.adminTabs;
    } else {
      this.tabs = this.userTabs;
    }
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css";

.ag-center-cols-clipper {
  min-height: unset !important;
}

.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  //overflow: hidden;
  //flex-grow: 1;
}

#myGrid {
  flex: 1 1 0;
  width: 100%;
}
.ag-cell-editor-autocomplete {
  background: whitesmoke;
}

.fa-hourglass-half {
  color: navy;
  font-size: 18px;
}

.fa-frown {
  color: navy;
  font-size: 18px;
}
</style>
