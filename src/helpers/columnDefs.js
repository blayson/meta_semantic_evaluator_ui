import SuggestButtonCellRenderer from "@/components/CellRenderers/SuggestButtonCellRenderer";
import CancelButtonCellRenderer from "@/components/CellRenderers/CancelButtonCellRenderer";
import ButtonAdminCellRenderer from "@/components/CellRenderers/Admin/ButtonAdminCellRenderer";
import ChangesAdminCellRenderer from "@/components/CellRenderers/Admin/ChangesAdminCellRenderer";

const getFeatureCol = function (tab) {
  const featureCol = {
    field: "feature",
    sortable: true,
    maxWidth: 250,
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },
    unSortIcon: true,
  };

  if (tab === "reviewed") {
    featureCol.editable = false;
  }
  return featureCol;
};

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

const getProductCol = function (tab) {
  const productCol = {
    field: "product",
    sortable: true,
    unSortIcon: true,
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },
  };
  if (tab === "reviewed") {
    productCol.editable = false;
  }
  return productCol;
};

const textCol = {
  field: "text",
  filter: true,
  width: 300,
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

export const NOT_REVIEWED_COLS = [
  getFeatureCol("notReviewed"),
  getSentimentCol("notReviewed"),
  getProductCol("notReviewed"),
  textCol,
  publishedCol,
  buttonCol,
];

export const REVIEWED_COLS = [
  {
    field: "id",
    hide: true,
  },
  getFeatureCol("reviewed"),
  getSentimentCol("reviewed"),
  getProductCol("reviewed"),
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
  textCol,
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
  {
    field: "suggestion_time",
    headerName: "Date",
    sortable: true,
    sort: "desc",
    maxWidth: 120,
    editable: false,
  },
  {
    field: "users_id",
    headerName: "User",
    filter: true,
    editable: false,
    maxWidth: 100,
  },
  {
    field: "changes",
    headerName: "Changes",
    filter: true,
    editable: false,
    cellRendererFramework: ChangesAdminCellRenderer,
  },
  {
    field: "button",
    maxWidth: 100,
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
