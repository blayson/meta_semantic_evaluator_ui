import {ACTIVE_MENU_ITEM_INDEX, SRE_TOKEN} from '@/helpers/constants';

function parseUser() {
  const token = localStorage.getItem(SRE_TOKEN);
  if (token) {
    const parts = token.split(".");
    const rawToken = atob(parts[1]);
    return JSON.parse(rawToken);
  }
  return null;
}

function getActiveMenuItem() {
  return localStorage.getItem(ACTIVE_MENU_ITEM_INDEX)
}

const user = parseUser();
const activeMenuItem = getActiveMenuItem();

const updatedDataObject = {
  index: Number,
  latest: Boolean,
  sentiment: {
    newValue: String,
    oldValue: String,
    initialValue: String,
  },
  feature: {
    newValue: String,
    oldValue: String,
    initialValue: String,
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
    features: {
      error: false,
    },
    // user
    auth: {
      user: user,
      loggedIn: !!user,
    },
    categories: {
      error: false,
    },
    profile: {
      activeMenuItem: activeMenuItem,
    }
  },
  featureNames: {},
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
  selectedReviewStatusTab: {
    name: "Not Reviewed",
    id: "notReviewed",
    rowIdGetter() {
      return (data) => data.id;
    },
  },
};
