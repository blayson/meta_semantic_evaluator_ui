import { tabMap } from "@/utils/constants";

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

  SAVE_CELL_UPDATES(state, payload) {
    const colId = payload.colId;
    let updated = false;
    for (const [data, i] of state.status.reviews.updatedData.entries()) {
      if (data.index === payload.index) {
        state.status.reviews.updatedData[i][colId].newValue = payload.newValue;
        state.status.reviews.updatedData[i][colId].oldValue = payload.oldValue;

        updated = true;
        break;
      }
    }
    if (updated !== true) {
      let dataToUpdate = {
        index: payload.index,
      };

      dataToUpdate[colId] = {
        newValue: payload.newValue,
        oldValue: payload.oldValue,
      };
      state.status.reviews.updatedData.push(dataToUpdate);
    }
  },

  SAVE_RESPONSE(state, data) {
    state.status.reviews.response = data;
  },

  UNDO_LAST_UPDATE(state) {
    if (state.status.reviews.updatedData.length >= 1) {
      state.status.reviews.poppedData.push(
        state.status.reviews.updatedData.pop()
      );
    }
  },

  REDO_LAST_UPDATE(state) {
    if (state.status.reviews.poppedData.length >= 1) {
      state.status.reviews.updatedData.push(
        state.status.reviews.poppedData.pop()
      );
    }
  },

  NULLIFY_UNDO_REDO(state) {
    state.status.reviews.updatedData = [];
    state.status.reviews.poppedData = [];
  },

  SAVE_ERROR(state, dataName, status) {
    state.status[dataName].error = status;
  },

  SET_TAB(state, tab) {
    state.status.reviews.tab = tabMap[tab];
  },
};
