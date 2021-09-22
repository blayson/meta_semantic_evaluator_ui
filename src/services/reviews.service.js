import http from "@/services/api";

const ReviewsService = {
  baseUrl: "/reviews",

  getReviews: async function (payload) {
    const url = `${this.baseUrl}?start=${payload.start}&end=${payload.end}${payload.sort}${payload.filter}`;
    return await http.get(url);
  },

  getProductCategories: async function () {
    const url = `${this.baseUrl}/categories`;
    return await http.get(url);
  },
};

export default ReviewsService;
