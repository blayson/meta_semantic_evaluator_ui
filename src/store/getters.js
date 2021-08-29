//to handle state
export const getters = {
  allReviews: (state) => state.status.reviews.data,

  productCategories: (state) => state.categories,

  getTotal: (state) => state.status.reviews.response.total,

  getResponseData: (state) => state.status.reviews.response,

  getUpdatedData: (state) => (index) => {
    for (const data of state.status.reviews.updatedData) {
      if (data.index === index) {
        return data;
      }
    }
  },
};
