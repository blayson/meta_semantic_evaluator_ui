import { HISTORY_SIZE, TAB_MAP } from "@/helpers/constants";

export const mutations = {
  SAVE_REVIEWS(state, reviews) {
    state.status.reviews.data = reviews;
  },

  SAVE_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SAVE_SELECTED_CATEGORIES(state, selected) {
    state.selectedCategories = selected;
  },

  SAVE_SELECTED_STATUS(state, selected) {
    state.selectedStatus = selected;
  },

  SAVE_CELL_UPDATES(state, payload) {
    const colId = payload.colId;
    let dataToUpdate = {
      index: payload.index,
    };

    dataToUpdate[colId] = {
      newValue: payload.newValue,
      oldValue: payload.oldValue,
    };
    state.status.reviews.updatedDataHistory.unshift(dataToUpdate);
    if (state.status.reviews.updatedDataHistory.length > HISTORY_SIZE) {
      state.status.reviews.updatedDataHistory.pop();
    }
  },

  SAVE_RESPONSE(state, data) {
    state.status.reviews.response = data;
  },

  UNDO_LAST_UPDATE(state) {
    if (state.status.reviews.updatedDataHistory.length >= 1) {
      const undoState = state.status.reviews.updatedDataHistory.shift();
      state.status.reviews.poppedDataHistory.unshift(undoState);
    }
    // Pop last item from the array as we have maximum history size
    if (state.status.reviews.poppedDataHistory.length > HISTORY_SIZE) {
      state.status.reviews.poppedDataHistory.pop();
    }
  },

  REDO_LAST_UPDATE(state) {
    if (state.status.reviews.poppedDataHistory.length >= 1) {
      const redoState = state.status.reviews.poppedDataHistory.shift();
      state.status.reviews.updatedDataHistory.unshift(redoState);
    }
    // Pop last item from the array as we have maximum history size
    if (state.status.reviews.updatedDataHistory.length > HISTORY_SIZE) {
      state.status.reviews.updatedDataHistory.pop();
    }
  },

  NULLIFY_UNDO_REDO(state) {
    state.status.reviews.updatedData = [];
    state.status.reviews.updatedDataHistory = [];
    state.status.reviews.poppedDataHistory = [];
  },

  SAVE_ERROR(state, dataName, status) {
    state.status[dataName].error = status;
  },

  SET_TAB(state, tab) {
    state.status.reviews.tab = TAB_MAP[tab];
  },

  LOGIN_SUCCESS(state, user) {
    state.status.auth.loggedIn = true;
    state.status.auth.user = user;
  },
  LOGIN_FAILURE(state) {
    state.status.auth.loggedIn = false;
    state.status.auth.user = null;
  },
  LOGOUT(state) {
    state.status.auth.loggedIn = false;
    state.status.auth.user = null;
  },
  REGISTER_SUCCESS(state) {
    state.status.auth.loggedIn = false;
  },
  REGISTER_FAILURE(state) {
    state.status.auth.loggedIn = false;
  },
  SET_STATUS_TYPE(state, type) {
    state.dataStatus = type;
  },
};
