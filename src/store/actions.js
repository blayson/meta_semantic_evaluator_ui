import ReviewService from "@/services/review.service";

export const actions = {
  async loadReviews({ commit }, payload) {
    /** Vuex action to load reviews from API */
    try {
      if (!payload) {
        payload = {
          start: 0,
          end: 100,
          sort: "",
          filter: "",
        };
      }
      let response = await ReviewService.getReviews(payload);
      commit("SAVE_REVIEWS", response.data.data);
      commit("SAVE_RESPONSE", {
        total: response.data.total,
        start: response.data.start,
        end: response.data.end,
      });
    } catch (e) {
      commit("SAVE_ERROR", "reviews", true);
      throw new Error(`API ${e}`);
    }
  },

  async loadProductCategories({ commit }) {
    try {
      let response = await ReviewService.getProductCategories();
      commit("SAVE_CATEGORIES", response.data);
    } catch (e) {
      commit("SAVE_ERROR", "categories", true);
      throw new Error(`API ${e}`);
    }
  },

  async submitUpdates({ commit }, payload) {
    try {
      const review_id = payload.review_id;
      delete payload.review_id;

      await ReviewService.submitUpdates(review_id, payload);
    } catch (e) {
      commit("SAVE_ERROR", "reviews", true);
      throw new Error(`API ${e}`);
    }
  },

  setSelectedCategories({ commit }, selectedCategories) {
    commit("SAVE_SELECTED_CATEGORIES", selectedCategories);
  },

  setTab({ commit }, tab) {
    commit("SET_TAB", tab);
  },
};
