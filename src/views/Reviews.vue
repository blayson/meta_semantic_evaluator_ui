<template>
  <v-container>
    <h1>Reviews</h1>
    <hr />
    <br />
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
                color="deep-purple accent-4"
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
                  <!--                  @data-model-changed="dataModelChanged"-->
                  <!--                  :isExternalFilterPresent="isExternalFilterPresent"-->
                  <!--                  :doesExternalFilterPass="doesExternalFilterPass"-->
                  <!--                  :enableRangeSelection="true"-->
                  <!--                  :enableFillHandle="true"-->
                  <!--                  :components="frameworkComponents"-->
                  <!--                  @on-row-data-changed="onRowDataChanged"-->
                </ag-grid-vue>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { AgGridVue } from "ag-grid-vue";
import SentimentCellRenderer from "@/components/CellRenderers/SentimentCellRenderer";
import ReviewFilters from "@/components/ReviewFilters";
import { applyFilters, applySort } from "@/helpers/utils";
import { HISTORY_SIZE } from "@/helpers/constants";
import { NOT_REVIEWED_COLS, REVIEWED_COLS } from "@/helpers/columnDefs";
import StatusCellRenderer from "@/components/CellRenderers/StatusCellRenderer";

export default {
  name: "Reviews",

  components: {
    AgGridVue,
    ReviewFilters,
    // eslint-disable-next-line vue/no-unused-components
    SentimentCellRenderer,
    // eslint-disable-next-line vue/no-unused-components
    StatusCellRenderer,
  },

  computed: {
    ...mapState({
      selectedProductCategories: "selectedCategories",
      dataStatus: "dataStatus",
      selectedStatus: "selectedStatus",
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
      columnDefs: NOT_REVIEWED_COLS,
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
      tabs: [
        {
          name: "Not Reviewed",
          id: "notReviewed",
          filter(store) {
            store.commit("SET_STATUS_TYPE", "notReviewed");
          },
          setColDefs() {
            return NOT_REVIEWED_COLS;
          },
        },
        {
          name: "Reviewed",
          id: "reviewed",
          filter(store) {
            store.commit("SET_STATUS_TYPE", "reviewed");
          },
          setColDefs() {
            return REVIEWED_COLS;
          },
        },
      ],

      undoSize: 0,
      redoSize: 0,
    };
  },

  methods: {
    methodFromParent(rowIndex) {
      alert("Updated: row - " + rowIndex + "!");
    },

    onPageSizeChanged(newPageSize) {
      this.gridApi.paginationSetPageSize(newPageSize);
    },

    onDateSortChanged(dateSort) {
      console.log(this.columnApi.getColumn("suggestion_time"));
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

    onFirstDataRendered() {
      this.undoSize = 0;
      this.redoSize = 0;
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

    setTab(tab) {
      this.columnDefs = tab.setColDefs();
      this.$store.dispatch("setTab", tab.id);
      tab.filter(this.$store);
      if (tab.id === "reviewed") {
        this.getRowNodeId = (data) => data.suggestions_id;
      } else if (tab.id === "notReviewed") {
        this.getRowNodeId = (data) => data.id;
      }
      this.gridApi.onFilterChanged();
    },

    showNotification(text) {
      console.log("notification: " + text);
      alert(text);
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

      const getDataStatus = () => {
        return this.dataStatus;
      };

      // const getSelectedStatus = () => {
      //   return this.selectedStatus;
      // };

      const updateData = () => {
        return this.updateRowData();
      };

      const getTotal = () => {
        return this.$store.getters.getTotal;
      };
      const getData = async (payload) => {
        await this.$store.dispatch("loadReviews", payload);
      };

      const showNotification = () => {
        this.showNotification();
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

          const sortParams = applySort(params.sortModel);
          const filterParams = applyFilters(
            params.filterModel,
            getSelectedCategories(),
            getDataStatus()
          );

          await getData({
            start: params.startRow,
            end: params.endRow,
            sort: sortParams,
            filter: filterParams,
          });
          // const respData = getResponseData();
          //
          // let page = respData.end / pageSize;
          //
          // goToPage(page);

          // if (response.status !== 200) {
          //   params.failCallback();
          //   return;
          // }

          // Get total count of rows (returns "100" in this example)
          const totalCount = getTotal();
          if (totalCount === 0) {
            console.log("No rows");
            showNotification("No rows");
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
      return data.map((datum) => {
        return {
          ...datum,
        };
      });
    },
    // dataModelChanged(rowData) {
    //   this.$store.dispatch("applyTransaction", rowData);
    // },
  },

  beforeMount() {
    const commit = (mutation, payload) => {
      this.$store.commit(mutation, payload);
    };

    this.gridOptions = {
      // eslint-disable-next-line no-unused-vars
      onRowEditingStarted: function (event) {
        console.log("never called - not doing row editing");
      },
      // eslint-disable-next-line no-unused-vars
      onRowEditingStopped: function (event) {
        console.log("never called - not doing row editing");
      },
      // eslint-disable-next-line no-unused-vars
      onCellEditingStarted: function (event) {
        console.log("cellEditingStarted");
      },
      // eslint-disable-next-line no-unused-vars
      onCellEditingStopped: function (event) {
        commit("SAVE_CELL_UPDATES", {
          index: event.rowIndex,
          colId: event.column.getId(),
          oldValue: event.oldValue,
          newValue: event.newValue,
        });
      },
    };

    this.defaultColDef = {
      minWidth: 100,
      resizable: true,
      editable: true,
      flex: 1,
    };

    // this.rowSelection = "multiple";
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

    this.getRowNodeId = (data) => data.id;
    this.context = { componentParent: this };
  },

  mounted() {
    this.gridApi = this.gridOptions.api;
    this.columnApi = this.gridOptions.columnApi;
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

.fa-hourglass-half {
  color: navy;
  font-size: 18px;
}

.fa-frown {
  color: navy;
  font-size: 18px;
}
</style>
