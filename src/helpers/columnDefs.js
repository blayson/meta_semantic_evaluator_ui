import SuggestButtonCellRenderer from "@/components/cellRenderers/SuggestButtonCellRenderer";
import CancelButtonCellRenderer from "@/components/cellRenderers/CancelButtonCellRenderer";
import ButtonAdminCellRenderer from "@/components/cellRenderers/admin/ButtonAdminCellRenderer";
import ChangesAdminCellRenderer from "@/components/cellRenderers/admin/ChangesAdminCellRenderer";
import AutocompleteSelectCellEditor from "ag-grid-autocomplete-editor";

const getSentimentCol = function (tab) {
  const sentimentCol = {
    field: "sentiment",
    sortable: true,
    maxWidth: 150,
    unSortIcon: true,
    colId: "sentiment",
    editable: false,
    cellRendererFramework: "SentimentCellRenderer",
  };

  if (tab === "notReviewed") {
    sentimentCol.editable = true;
    sentimentCol.cellEditor = "agSelectCellEditor";
    sentimentCol.cellEditorParams = {
      values: ["positive", "negative"],
    };
  }

  return sentimentCol;
};

const getProductCol = function () {
  return {
    field: "product",
    sortable: true,
    unSortIcon: true,
    editable: false,
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },
  };
};

const textCol = {
  field: "text",
  filter: true,
  width: 300,
  maxWidth: 700,
  editable: false,
  filterParams: {
    filterOptions: ["contains"],
  },
};

const publishedCol = {
  field: "published_at",
  sortable: true,
  sort: "desc",
  hide: true,
};

const buttonCol = {
  field: "button",
  maxWidth: 100,
  valueGetter: "node.id",
  headerName: "Submit",
  colId: "button",
  editable: false,
  pinned: "right",
  cellRendererFramework: SuggestButtonCellRenderer,
};

export const getNotReviewedCols = (featureNames) => {
  return [
    textCol,
    {
      field: "feature",
      headerName: "Feature",
      colId: "feature",
      cellEditor: AutocompleteSelectCellEditor,
      cellEditorParams: {
        required: true,
        selectData: featureNames,
        placeholder: "Select an option",
      },
      valueFormatter: (params) => {
        if (params.value) {
          return params.value.label || params.value.value || params.value;
        }
        return "";
      },
      sortable: true,
      maxWidth: 250,
      filter: true,
      filterParams: {
        filterOptions: ["contains"],
      },
      unSortIcon: true,
      editable: true,
    },
    getSentimentCol("notReviewed"),
    getProductCol(),
    publishedCol,
    buttonCol,
  ];
};

export const REVIEWED_COLS = [
  textCol,
  {
    field: "id",
    hide: true,
  },
  {
    field: "suggestion_feature_name",
    headerName: "Feature",
    sortable: true,
    // valueGetter: "node.id",
    maxWidth: 350,
    minWidth: 200,
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },
    unSortIcon: true,
    colId: "feature",
    editable: false,
    cellRendererFramework: "ReviewedFeatureNameCellRenderer",
  },
  {
    field: "suggestion_sentiment",
    sortable: true,
    headerName: "Sentiment",
    maxWidth: 220,
    minWidth: 150,
    unSortIcon: true,
    colId: "sentiment",
    editable: false,
    cellRendererFramework: "ReviewedSentimentCellRenderer",
  },
  getProductCol(),
  {
    field: "status",
    sortable: true,
    unSortIcon: true,
    editable: false,
    maxWidth: 150,
    filter: "agTextColumnFilter",
    filterParams: {
      filterOptions: ["contains"],
    },
    cellRendererFramework: "StatusCellRenderer",
  },
  {
    field: "suggestion_time",
    sortable: true,
    sort: "desc",
    hide: true,
  },
  {
    field: "button",
    maxWidth: 100,
    valueGetter: "node.id",
    headerName: "Cancel",
    colId: "button",
    editable: false,
    pinned: "right",
    cellRendererFramework: CancelButtonCellRenderer,
  },
];

export const ADMIN_COLS = [
  textCol,
  {
    field: "suggestion_time",
    headerName: "Date",
    sortable: true,
    sort: "asc",
    maxWidth: 120,
    editable: false,
    hide: false,
  },
  {
    field: "user_name",
    headerName: "User",
    filter: true,
    editable: false,
    maxWidth: 110,
  },
  {
    field: "changes",
    headerName: "Changes",
    minWidth: 350,
    filter: true,
    editable: false,
    cellRendererFramework: ChangesAdminCellRenderer,
  },
  {
    field: "button",
    width: 100,
    maxWidth: 110,
    minWidth: 100,
    valueGetter: "node.id",
    headerName: "Approve",
    colId: "button",
    editable: false,
    pinned: "right",
    cellRendererFramework: ButtonAdminCellRenderer,
  },
];

export const DEFAULT_COL_DEFS = {
  minWidth: 100,
  resizable: true,
  editable: true,
  flex: 1,
};

export const REVIEWED_DEF_COL_DEFS = {
  minWidth: 100,
  resizable: true,
  editable: false,
  flex: 1,
};
