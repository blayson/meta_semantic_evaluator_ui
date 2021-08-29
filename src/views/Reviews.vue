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
                  v-on:click="setTab(item.id)"
                >
                  {{ item.name }}
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="example-wrapper">
                <!--                <button @click="getSelectedRows()">Get Selected Rows</button>-->

                <div class="test-header"></div>

                <ag-grid-vue
                  style="width: 100%"
                  class="ag-theme-material"
                  :columnDefs="columnDefs"
                  :gridOptions="gridOptions"
                  @grid-ready="onGridReady"
                  :defaultColDef="defaultColDef"
                  :rowSelection="rowSelection"
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
                  domLayout="autoHeight"
                  @cell-value-changed="onCellValueChanged"
                  :context="context"
                  :undoRedoCellEditing="undoRedoCellEditing"
                  :undoRedoCellEditingLimit="undoRedoCellEditingLimit"
                  :enableCellChangeFlash="true"
                  @first-data-rendered="onFirstDataRendered"
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
import SentimentCellRenderer from "@/components/SentimentCellRenderer";
import ButtonCellRenderer from "@/components/ButtonCellRenderer";
import ReviewFilters from "@/components/ReviewFilters";
import { applyFilters, applySort } from "@/utils/utils";

export default {
  name: "Reviews",
  components: {
    AgGridVue,
    ReviewFilters,
    // eslint-disable-next-line vue/no-unused-components
    SentimentCellRenderer,
  },
  computed: {
    ...mapState({
      selectedProductCategories: "selectedCategories",
    }),
  },
  data() {
    return {
      gridOptions: null,
      cacheBlockSize: null,
      rowBuffer: null,
      gridApi: null,
      columnApi: null,
      columnDefs: [
        {
          field: "feature",
          sortable: true,
          maxWidth: 250,
          filter: true,
          unSortIcon: true,
        },
        {
          field: "sentiment",
          sortable: true,
          maxWidth: 150,
          unSortIcon: true,
          colId: "sentiment",
          cellRendererFramework: "SentimentCellRenderer",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: ["positive", "negative"],
          },
        },
        {
          field: "product",
          sortable: true,
          unSortIcon: true,
          filter: true,
          // filterParams: filterParams,
        },
        {
          field: "text",
          filter: true,
          width: 300,
        },
        {
          field: "published_at",
          sortable: true,
          hide: true,
        },
        {
          field: "button",
          maxWidth: 100,
          valueGetter: "node.id",
          headerName: "Submit",
          colId: "button",
          editable: false,
          cellRendererFramework: ButtonCellRenderer,
        },
      ],
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
      },

      undoRedoCellEditing: null,
      undoRedoCellEditingLimit: null,
      context: null,

      args: 0,
      tab: null,
      tabs: [
        { name: "Not Reviewed", id: "notReviewed" },
        { name: "Reviewed", id: "reviewed" },
        { name: "Rejected", id: "rejected" },
        { name: "Approved", id: "approved" },
        { name: "All", id: "all" },
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
    },

    undo() {
      this.gridApi.undoCellEditing();
      this.$store.commit("UNDO_LAST_UPDATE");
    },

    redo() {
      this.gridApi.redoCellEditing();
      this.$store.commit("REDO_LAST_UPDATE");
    },

    setTab(tab) {
      this.$store.dispatch("setTab", tab);
    },

    showNotification(text) {
      console.log("notification: " + text);
      alert(text);
    },

    // isExternalFilterPresent() {
    //   console.log("isExternalFilterPresent");
    //   return true;
    // },
    //
    // // eslint-disable-next-line no-unused-vars
    // doesExternalFilterPass(node) {
    //   return true;
    // },

    async onGridReady(params) {
      const getSelectedCategories = () => {
        return this.selectedProductCategories;
      };

      const updateData = () => {
        return this.updateRowData();
      };

      // const getResponseData = () => {
      //   return this.$store.getters.getResponseData;
      // };
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

      // let pageSize = this.gridApi.paginationGetPageSize();
      //
      // const goToPage = (page) => {
      //   this.gridApi.paginationGoToPage(page);
      // };

      nullifyUndoRedo();

      let dataSource = {
        rowCount: null,

        getRows: async function (params) {
          nullifyUndoRedo();

          const sortParams = applySort(params.sortModel);
          const filterParams = applyFilters(
            params.filterModel,
            getSelectedCategories()
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

    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.make} ${node.model}`)
        .join(", ");
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
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

    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.cacheBlockSize = 100;
    this.paginationPageSize = 10;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 50;
    this.maxBlocksInCache = 10;
    this.rowBuffer = 0;
    this.undoRedoCellEditing = true;
    this.undoRedoCellEditingLimit = 10;

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

.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#myGrid {
  flex: 1 1 0px;
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
