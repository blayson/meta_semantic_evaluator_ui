import { SRE_TOKEN } from "@/helpers/constants";

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
      name: "Rejected",
      id: "rejected",
    },
    {
      name: "Approved",
      id: "approved",
    },
    {
      name: "Pending",
      id: "pending",
    },
  ],
  selectedReviewStatusTab: "notReviewed",
};
