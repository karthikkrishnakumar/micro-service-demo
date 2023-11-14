import User from "../model/user.js";
import bcryptPassword from "../utils/bcryptPassword.js";

/**
 * Seed an user with the role of "Super Admin" into the database.
 * Checks if an user with the specified email already exists.
 * If not, creates a new user document and saves it to the database.
 */
const userSeeder = async () => {
  // User data for the Super Admin
  const user = {
    first_name: "Super",
    last_name: "User",
    email: "info@techfriar.com",
    gender: "male",
    phone: "9988776655",
    address: "India",
  };

  const seedUser = async () => {
    // Check if an user with the specified email already exists in the database.
    const existingUser = await User.findOne({
      email: user.email,
    });
    // If the user does not exist, create a new user document and save it to the database.
    if (!existingUser) {
      user.password = await bcryptPassword("Admin123,.");
      // Create a new User document with the user data and save it to the database
      const newUser = new User(user);
      await newUser.save();
    }
  };
  seedUser();
};

export default userSeeder;
