import { tabMap } from "@/utils/constants";

export const mutations = {
  SAVE_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
  SAVE_REVIEWS_PAGINATION(state, { page, size, total }) {
    state.reviewsPagination.page = page;
    state.reviewsPagination.size = size;
    state.reviewsPagination.total = total;
  },
  SAVE_LOADING(state, dataName, status) {
    state.status[dataName].loading = status;
  },
  SAVE_ERROR(state, dataName, status) {
    state.status[dataName].error = status;
  },
  SAVE_PROMISE(state, promise) {
    state.reviewsPromise = promise;
  },

  SET_TAB(state, tab) {
    state.status.reviews.tab = tabMap[tab];
  },
};
