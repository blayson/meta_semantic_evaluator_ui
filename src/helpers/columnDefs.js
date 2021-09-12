import SuggestButtonCellRenderer from "@/components/CellRenderers/SuggestButtonCellRenderer";
import CancelButtonCellRenderer from "@/components/CellRenderers/DeleteButtonCellRenderer";

export let NOT_REVIEWED_COLS = [
  {
    field: "feature",
    sortable: true,
    maxWidth: 250,
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },
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
    filterParams: {
      filterOptions: ["contains"],
    },
  },
  {
    field: "text",
    filter: true,
    width: 300,
    filterParams: {
      filterOptions: ["contains"],
    },
  },
  {
    field: "published_at",
    sortable: true,
    sort: "desc",
    hide: true,
  },
  {
    field: "button",
    maxWidth: 100,
    valueGetter: "node.id",
    headerName: "Submit",
    colId: "button",
    editable: false,
    pinned: "right",
    cellRendererFramework: SuggestButtonCellRenderer,
  },
];

export let REVIEWED_COLS = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "feature",
    sortable: true,
    maxWidth: 250,
    filter: true,
    unSortIcon: true,
    filterParams: {
      filterOptions: ["contains"],
    },
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
    filterParams: {
      filterOptions: ["contains"],
    },
  },
  {
    field: "status",
    sortable: true,
    unSortIcon: true,
    editable: false,
    filter: "agTextColumnFilter",
    filterParams: {
      filterOptions: ["contains"],
    },

    cellRendererFramework: "StatusCellRenderer",
  },
  {
    field: "text",
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },

    width: 300,
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
    headerName: "Delete",
    colId: "button",
    editable: false,
    pinned: "right",
    cellRendererFramework: CancelButtonCellRenderer,
  },
];

export let ADMIN_COLS = [
  {
    field: "feature",
    sortable: true,
    maxWidth: 250,
    filter: true,
    unSortIcon: true,
    filterParams: {
      filterOptions: ["contains"],
    },
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
    filterParams: {
      filterOptions: ["contains"],
    },
  },
  {
    field: "status",
    sortable: true,
    unSortIcon: true,
    editable: false,
    filter: "agTextColumnFilter",
    filterParams: {
      filterOptions: ["contains"],
    },

    cellRendererFramework: "StatusCellRenderer",
  },
  {
    field: "text",
    filter: true,
    filterParams: {
      filterOptions: ["contains"],
    },

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
    headerName: "Delete",
    colId: "button",
    editable: false,
    pinned: "right",
    cellRendererFramework: CancelButtonCellRenderer,
  },
];
