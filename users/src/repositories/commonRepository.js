import http from "../utils/http.js";

export default class commonRepository {
  async listUserPosts(userId) {
    try {
      const props = {
        user_id: userId,
      };
      const { body } = await http("post").post(
        "/api/post/list_user_posts",
        props,
        true
      );
      return body;
    } catch (error) {
      return {
        status: false,
        message: "Failed to List Posts...Try again!",
      };
    }
  }
}
