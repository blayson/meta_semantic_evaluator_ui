// import { API_URL } from "@/utils/constants";
import { http } from "@/utils/http-common";

const ReviewService = {
  getReviews: async function (start, end, sort, filter) {
    let url = `/reviews?start=${start}&end=${end}${sort}${filter}`;

    try {
      return await http.get(url);
    } catch (error) {
      console.error(error);
    }
  },
};

export default ReviewService;
