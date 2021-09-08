//to handle state
export const getters = {
  allReviews: (state) => state.status.reviews.data,

  productCategories: (state) => state.categories,

  getTotal: (state) => state.status.reviews.response.total,

  getResponseData: (state) => state.status.reviews.response,

  getUpdatedDataHistory: (state) => (index) => {
    for (const data of state.status.reviews.updatedDataHistory) {
      if (data.index === index) {
        return data;
      }
    }
    return null;
  },

  getInitialRowData: (state) => (rowId, column) => {
    for (const data of state.status.reviews.data) {
      if (rowId === data.id) {
        return data[column];
      }
    }
  },
};
