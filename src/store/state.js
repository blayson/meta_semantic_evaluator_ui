export const state = {
  // user
  isLoggedIn: false,
  user: null,

  // reviews
  status: {
    reviews: {
      data: [],
      updatedData: [],
      response: {
        total: 0,
        start: 0,
        end: 100,
      },
      error: false,
      tab: 1,
    },
  },

  // product categories for filters
  categories: [],
  selectedCategories: [],
};
