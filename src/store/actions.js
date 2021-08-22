import Vue from "vue";

export const actions = {
  async loadReviews({ commit }, payload) {
    // if (state.status.reviews.loading) {
    //   return state.status.reviews.loading
    // }

    let url = `/reviews?page=${payload.page}&limit=${payload.limit}`;

    commit("SAVE_LOADING", "reviews", true);
    return Vue.prototype.$http
      .get(url)
      .then((response) => {
        commit("SAVE_REVIEWS", response.data.data);
        commit("SAVE_REVIEWS_PAGINATION", {
          page: response.data.page,
          size: response.data.size,
          total: response.data.total,
        });
        commit("SAVE_LOADING", "reviews", false);

        // state.reviewsPromise = null
      })
      .catch((error) => {
        commit("SAVE_ERROR", "reviews", true);
        commit("SAVE_LOADING", "reviews", false);

        throw new Error(`API ${error}`);
      });

    // commit("SAVE_PROMISE", promise)
    // return false
    // return promise
  },

  setTab({ commit }, tab) {
    commit("SET_TAB", tab);
  },
};
