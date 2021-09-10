import SuggestButtonCellRenderer from "@/components/CellRenderers/SuggestButtonCellRenderer";
import CancelButtonCellRenderer from "@/components/CellRenderers/CancelButtonCellRenderer";

export let NOT_REVIEWED_COLS = [
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
    pinned: "right",
    cellRendererFramework: SuggestButtonCellRenderer,
  },
];

export let REVIEWED_COLS = [
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
  },
  {
    field: "status",
    sortable: true,
    unSortIcon: true,
    editable: false,
    cellRendererFramework: "StatusCellRenderer",
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
    pinned: "right",
    cellRendererFramework: CancelButtonCellRenderer,
  },
];
