/**
 * Transform the post resource into an object.
 *
 * @param {Object} post - The post object to transform.
 * @return {Object} - An object containing selected properties from the post.
 */
const postResource = (post) => {
  return {
    id: post._id,
    post: post.post,
    post_id: post.post_id,
  };
};
export default postResource;
