<template>
  <v-container>
    <h1>Reviews</h1>
    <hr />
    <br />
    <v-row no-gutters>
      <v-col md="2">
        <v-card>
          <v-card-title>Filters</v-card-title>
        </v-card>
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
          <v-row no-gutters>
            <v-col md="3" style="padding: 0 10px 0 10px">
              <v-select label="Search"></v-select>
            </v-col>
            <v-col md="3" style="padding: 0 10px 0 10px">
              <v-select label="Search"></v-select>
            </v-col>
            <v-col
              justify="end"
              align-self="center"
              md="3"
              offset-md="3"
              style="padding: 0 10px 0 10px"
            >
              Newest first
              <span> | </span>
              Oldest first
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!--              <v-tabs-items v-model="tab">-->
              <!--                <v-tab-item-->
              <!--                    v-for="item in 5"-->
              <!--                    :key="item"-->
              <!--                >-->
              <!--                  <v-card flat>-->
              <!--                    <keep-alive>-->
              <!--                      <component v-bind:is="'ReviewTable'"></component>-->

              <!--                    </keep-alive>-->
              <!--                  </v-card>-->
              <!--                </v-tab-item>-->
              <!--              </v-tabs-items>-->

              <div class="ag-theme-material">
                <!--                <button @click="getSelectedRows()">Get Selected Rows</button>-->
                <ag-grid-vue
                  style="width: 100%"
                  :columnDefs="columnDefs"
                  :gridOptions="gridOptions"
                  @grid-ready="onGridReady"
                  @on-row-data-changed="onRowDataChanged"
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
                  :components="frameworkComponents"
                >
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
// import ReviewTable from "@/components/ReviewTable";
import { AgGridVue } from "ag-grid-vue";
// import { API_URL } from "@/utils/constants";
// import axios from "axios";
import ReviewService from "@/services/review.service";
// import { sortData } from "@/utils/utils";
// import { sortAndFilter } from "@/utils/utils";
// import { API_URL } from "@/utils/constants";
// import loading from "./overlays/loading";
// import CustomLoadingOverlay from "@/views/overlays/CustomLoadingOverlay";

export default {
  name: "Reviews",
  components: {
    // ReviewTable,
    // CustomLoadingOverlay,
    AgGridVue,
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
      components: null,
      rowSelection: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
      getRowNodeId: null,
      frameworkComponents: null,
      // loadingCellRenderer: null,
      // loadingCellRendererParams: null,
      args: 0,
      tab: null,
      // tabComponents: [ReviewTable],
      tabs: [
        { name: "Not Reviewed", id: "notReviewed" },
        { name: "Reviewed", id: "reviewed" },
        { name: "Rejected", id: "rejected" },
        { name: "Approved", id: "approved" },
        { name: "All", id: "all" },
      ],
    };
  },
  computed: mapState(["status"]),
  methods: {
    setTab(tab) {
      this.$store.dispatch("setTab", tab);
    },
    onRowDataChanged() {
      this.gridApi.showLoadingOverlay();
    },
    onGridReady(params) {
      // const updateData = (data) => {
      // data.data.forEach(function (data, index) {
      //   data.id = "R" + (index + 1);
      // });

      var dataSource = {
        rowCount: null,

        getRows: async function (params) {
          // console.log("asking for " + params.startRow + " to " + params.endRow);
          let sortParams = "";
          if (params.sortModel) {
            params.sortModel.forEach((model) => {
              switch (model.colId) {
                case "feature":
                  if (sortParams) {
                    sortParams += `,feature ${model.sort}`;
                  } else {
                    sortParams += `&sort=feature ${model.sort}`;
                  }
                  break;
                case "sentiment":
                  if (sortParams) {
                    sortParams += `,sentiment ${model.sort}`;
                  } else {
                    sortParams += `&sort=sentiment ${model.sort}`;
                  }
                  break;
                case "product":
                  if (sortParams) {
                    sortParams += `,product ${model.sort}`;
                  } else {
                    sortParams += `&sort=product ${model.sort}`;
                  }
                  break;
                default:
                  sortParams = "";
              }
            });
          }

          let filterParams = "";
          // if (params.filterModel) {
          //   params.filterModel.forEach((model) => {
          //     switch (model.colId) {
          //       case "feature":
          //         filterParams += `&filter[feature]=${model.filter}`;
          //         break;
          //       case "sentiment":
          //         if (filterParams) {
          //           filterParams += `&filter[sentiment]=${model.filter}`;
          //         } else {
          //           filterParams += `&filter[sentiment]=${model.filter}`;
          //         }
          //         break;
          //       case "product":
          //         filterParams += `&filter[feature]=${model.filter}`;
          //
          //         break;
          //       default:
          //         filterParams = "";
          //     }
          //   });
          // }

          // let page = this.gridApi.api.paginationGetCurrentPage();
          let response = await ReviewService.getReviews(
            params.startRow,
            params.endRow,
            sortParams,
            filterParams
          );

          if (response.status !== 200) {
            params.failCallback();
            return;
          }

          // Get total count of rows (returns "500" in this example)
          const totalCount = response.data.data.total;
          // Get the rows in this batch
          const rowsThisPage = response.data.data;
          // If number of rows > 500, set lastRow = 500
          // otherwise set it to -1 and continue loading when scrolling down
          var lastRow = params.endRow >= totalCount ? totalCount : -1;
          // Tell the grid we got our rows ready
          params.successCallback(rowsThisPage, lastRow);

          // setTimeout(function () {
          // var dataAfterSortingAndFiltering = sortAndFilter(
          //   data.data,
          //   params.sortModel,
          //   params.filterModel
          // );
          //
          //   var rowsThisPage = dataAfterSortingAndFiltering.slice(
          //     params.startRow,
          //     params.endRow
          //   );
          //
          //   var lastRow = -1;
          //   if (dataAfterSortingAndFiltering.length <= params.endRow) {
          //     lastRow = dataAfterSortingAndFiltering.length;
          //   }
          //
          //   params.successCallback(rowsThisPage, lastRow);
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
  },
  beforeMount() {
    // this.$store.dispatch("setTab", "notReviewed");
    this.gridOptions = {};
    this.columnDefs = [
      // {
      //   headerName: "ID",
      //   maxWidth: 100,
      //   valueGetter: "node.id",
      //   cellRenderer: "loadingRenderer",
      //   sortable: false,
      //   suppressMenu: true,
      // },
      {
        field: "feature",
        sortable: true,
        filter: true,
        cellRenderer: "loadingRenderer",
        checkboxSelection: true,
      },
      { field: "sentiment" },
      { field: "product" },
      { field: "text" },
    ];
    this.defaultColDef = {
      minWidth: 150,
      sortable: true,
    };

    this.frameworkComponents = {
      loadingRenderer: (params) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return `<div class="ag-custom-loading-cell" style="padding-left: 10px; line-height: 25px;">
         <i class="fas fa-spinner fa-pulse"></i> <span> loading... </span>
     </div>`;
        }
      },
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

    this.getRowNodeId = (item) => {
      return item.id;
    };
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
