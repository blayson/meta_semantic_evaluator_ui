export const state = {
  category: [],
  isLoggedIn: false,
  reviewIds: [],
  reviews: [],
  reviewsPagination: {
    page: 0,
    size: 0,
    total: 0,
  },
  reviewsPromise: null,
  status: {
    reviews: {
      loading: false,
      error: false,
      tab: 1,
    },
  },
};
