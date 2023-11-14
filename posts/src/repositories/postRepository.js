import Post from "../model/post.js";

export default class postRepository {
  /**
   * Add Post
   * @param Array data
   * @return Post newPost
   */
  async addPost(data) {
    const newPost = new Post();

    Object.keys(data).forEach((key) => {
      newPost[key] = data[key];
    });
    newPost.save();
    return newPost;
  }

  /**
   * Get Post
   * @param String postId
   * @return Post
   */
  async getPost(postId) {
    return Post.findById(postId);
  }

  /**
   * Update Post
   * @param Array postDetails
   * @return Post postData
   */
  async updatePost(postDetails) {
    const postData = await Post.findById({
      _id: postDetails.id,
    });
    if (!postData) {
      return null;
    }
    Object.assign(postData, postDetails);
    await postData.save();
    return postData;
  }

  /**
   * List Posts
   * @return Collection Post
   */
  async listPosts() {
    const posts = await Post.find();
    return { items: posts, total: posts.length };
  }

  /**
   * Delete Post
   * @param String postId
   * @return Boolean true|false
   */
  async deletePost(postId) {
    const postData = await Post.findById({ _id: postId });
    if (!postData) {
      return false;
    }
    await Post.deleteOne(postData);
    return true;
  }

  /**
   * Check The Id Is Existing
   * @param String id
   * @return Post postData
   */
  async checkIdExists(id) {
    const postData = await Post.findOne({ _id: id });
    return postData;
  }

  /**
   * List Posts by User ID
   * @param {string} userId - The ID of the user whose posts are to be listed
   * @return {Object} - An object containing 'items' (array of posts) and 'total' (total number of posts)
   */
  async listPostsByUserId(userId) {
    const posts = await Post.find({ user_id: userId });
    return { items: posts, total: posts.length };
  }
}
