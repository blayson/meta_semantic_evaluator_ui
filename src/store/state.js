import { SRE_TOKEN } from "@/helpers/constants";
import { NOT_REVIEWED_COLS, REVIEWED_COLS } from "@/helpers/columnDefs";

function parseUser() {
  const token = localStorage.getItem(SRE_TOKEN);
  if (token) {
    const parts = token.split(".");
    const rawToken = atob(parts[1]);
    return JSON.parse(rawToken);
  }
  return null;
}

const user = parseUser();

const updatedDataObject = {
  index: Number,
  sentiment: {
    newValue: String,
    oldValue: String,
  },
  feature: {
    newValue: String,
    oldValue: String,
  },
  product: {
    newValue: String,
    oldValue: String,
  },
};

export const state = {
  // reviews
  status: {
    reviews: {
      data: [],
      updatedDataHistory: [updatedDataObject],
      poppedDataHistory: [updatedDataObject],
      response: {
        total: 0,
        start: 0,
        end: 100,
      },
      error: false,
      tab: 1,
    },
    // user
    auth: {
      user: user,
      loggedIn: !!user,
    },
  },
  // product categories for filters
  categories: [],
  selectedCategories: [],
  selectedStatus: [],
  reviewStatus: [
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
    {
      name: "Rejected",
      id: "rejected",
      filter(store) {
        store.commit("SET_STATUS_TYPE", "rejected");
      },
    },
    {
      name: "Approved",
      id: "approved",
      filter(store) {
        store.commit("SET_STATUS_TYPE", "approved");
      },
    },
    {
      name: "All",
      id: "all",
      filter(store) {
        store.commit("SET_STATUS_TYPE", "all");
      },
    },
  ],
  statusDataType: "",
};
