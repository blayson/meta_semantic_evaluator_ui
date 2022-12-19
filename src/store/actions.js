import ReviewsService from "@/services/reviews.service";
import AuthService from "@/services/auth.service";
import SuggestionsService from "@/services/suggestions.service";
import FeaturesService from "@/services/features.service";
import { ACTIVE_MENU_ITEM_INDEX } from "@/helpers/constants";
import AdminService from "@/services/admin.service";

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
      let response = await AdminService.getSuggestionsForApprove(payload);
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

  async editSuggestion({ commit }, payload) {
    try {
      await SuggestionsService.editSuggestion(payload);
    } catch (e) {
      commit("SAVE_ERROR", "admin", true);
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

  async rejectSuggestion({ commit }, payload) {
    try {
      await AdminService.rejectSuggestion(payload);
    } catch (e) {
      commit("SAVE_ERROR", "reviews", true);
      throw new Error(`API ${e}`);
    }
  },

  async approveSuggestion({ commit }, payload) {
    try {
      await AdminService.approveSuggestion(payload);
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
      console.log(response.status);
      commit("REGISTER_SUCCESS", response.status);
      return response;
    } catch (e) {
      commit("REGISTER_FAILURE", e.response.status);
      // throw e;
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

  async loadFeatureNames({ commit }, payload) {
    try {
      let response = await FeaturesService.getAllFeatureNamesByLang(payload);
      commit("SAVE_FEATURE_NAMES", response.data.data);
    } catch (e) {
      commit("SAVE_ERROR", "features", true);
      throw new Error(`API ${e}`);
    }
  },

  setActiveMenuItem({ commit }, data) {
    localStorage.setItem(ACTIVE_MENU_ITEM_INDEX, data);
    commit("SET_ACTIVE_MENU_ITEM", data);
  },

  async getAllUsers({ commit }) {
    try {
      let response = await AdminService.getAllUsers();
      commit("SAVE_ALL_USERS", response.data.data);
      return response;
    } catch (e) {
      commit("SAVE_ERROR", "users", true);
      throw new Error(`API ${e}`);
    }
  },

  async updateUser({ commit }, data) {
    try {
      const users_id = data.users_id;
      delete data.users_id;
      delete data.register_language;
      const response = await AdminService.updateUser(users_id, data);
      commit("UPDATE_USER_SUCCESS", response.status);
    } catch (e) {
      commit("SAVE_ERROR", "admin", true);
      throw new Error(`API ${e}`);
    }
  },

  async changePassword({ commit }, data) {
    try {
      const response = await AdminService.changePassword(data);
      console.log(response.status);
      commit("SAVE_RESPONSE_STATUS", "admin", response.status);
    } catch (e) {
      commit("SAVE_ERROR", "admin", true);
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      await AdminService.deleteUser(userId);
    } catch (e) {
      commit("SAVE_ERROR", "admin", true);
      throw new Error(`API ${e}`);
    }
  },
};
