import ReviewsService from "@/services/reviews.service";
import AuthService from "@/services/auth.service";
import SuggestionsService from "@/services/suggestions.service";

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
      let response = await ReviewsService.getReviews(payload);
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

  async loadForApprove({ commit }, payload) {
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
      let response = await SuggestionsService.getSuggestionsForApprove(payload);
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
      let response = await ReviewsService.getProductCategories();
      commit("SAVE_CATEGORIES", response.data);
    } catch (e) {
      commit("SAVE_ERROR", "categories", true);
      throw new Error(`API ${e}`);
    }
  },

  async submitSuggestions({ commit }, payload) {
    try {
      delete payload.index;

      await SuggestionsService.submitSuggestions(payload, true);
    } catch (e) {
      commit("SAVE_ERROR", "reviews", true);
      throw new Error(`API ${e}`);
    }
  },

  async submitNoSuggestions({ commit }, payload) {
    try {
      await SuggestionsService.submitSuggestions(payload, false);
    } catch (e) {
      commit("SAVE_ERROR", "reviews", true);
      throw new Error(`API ${e}`);
    }
  },

  async login({ commit }, formData) {
    try {
      const user = await AuthService.login(formData);
      commit("LOGIN_SUCCESS", user);
      return user;
    } catch (e) {
      commit("LOGIN_FAILURE");
      throw e;
    }
  },

  async register({ commit }, payload) {
    try {
      const response = await AuthService.register(payload);
      commit("REGISTER_SUCCESS");
      return response;
    } catch (e) {
      commit("REGISTER_FAILURE");
      throw e;
    }
  },

  logout({ commit }) {
    AuthService.logout();
    commit("LOGOUT");
  },

  setSelectedCategories({ commit }, selectedCategories) {
    commit("SAVE_SELECTED_CATEGORIES", selectedCategories);
  },

  async deleteSuggestions({ commit }, payload) {
    try {
      await SuggestionsService.deleteSuggestion(payload.suggestions_id);
    } catch (e) {
      commit("SAVE_ERROR", "suggestions", true);
      throw e;
    }
  },

  // async setTab({ commit }, tab) {
  //   commit("SET_TAB", tab);
  // },
};
