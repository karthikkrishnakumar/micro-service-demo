import Post from "../model/post.js";

/**
 * Seed an post with the role of "Super Admin" into the database.
 * Checks if an post with the specified email already exists.
 * If not, creates a new post document and saves it to the database.
 */
const postSeeder = async () => {
  // Post data for the Super Admin
  const post = {
    post: "This is test post",
    user_id: "6551f1096188521b766d01dd",
  };

  const seedPost = async () => {
    const newPost = new Post(post);
    await newPost.save();
  };
  seedPost();
};

export default postSeeder;
