// import { API_URL } from "@/utils/constants";
import { http } from "@/utils/http-common";

const ReviewService = {
  baseUrl: "/reviews",

  getReviews: async function (payload) {
    const url = `${this.baseUrl}?start=${payload.start}&end=${payload.end}${payload.sort}${payload.filter}`;
    return await http.get(url);
  },

  getProductCategories: async function () {
    const url = `${this.baseUrl}/categories`;
    return await http.get(url);
  },

  submitUpdates: async function (review_id, payload) {
    const url = `${this.baseUrl}/${review_id}/updates/submit`;
    return await http.post(url, payload);
  },
};

export default ReviewService;
