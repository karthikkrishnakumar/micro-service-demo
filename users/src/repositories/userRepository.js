import User from "../model/user.js";

export default class userRepository {
  /**
   * Add User
   * @param Array data
   * @return User newUser
   */
  async addUser(data) {
    const newUser = new User();

    Object.keys(data).forEach((key) => {
      newUser[key] = data[key];
    });
    newUser.save();
    return newUser;
  }

  /**
   * Get User
   * @param String userId
   * @return User
   */
  async getUser(userId) {
    return User.findById(userId);
  }

  /**
   * Update User
   * @param Array userDetails
   * @return User userData
   */
  async updateUser(userDetails) {
    const userData = await User.findById({
      _id: userDetails.id,
    });
    if (!userData) {
      return null;
    }
    Object.assign(userData, userDetails);
    await userData.save();
    return userData;
  }

  /**
   * List Users
   * @return Collection User
   */
  async listUsers() {
    const users = await User.find();
    return { items: users, total: users.length };
  }

  /**
   * Delete User
   * @param String userId
   * @return Boolean true|false
   */
  async deleteUser(userId) {
    const userData = await User.findById({ _id: userId });
    if (!userData) {
      return false;
    }
    await User.deleteOne(userData);
    return true;
  }

  /**
   * Check The Id Is Existing
   * @param String id
   * @return User userData
   */
  async checkIdExists(id) {
    const userData = await User.findOne({ _id: id });
    return userData;
  }

  /**
   * Get User By Mail
   * @param String email
   * @return User user
   */
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    if (user) {
      return user;
    }
  }

  /**
   * Get User by phone
   * @param String phone
   * @return User user
   */
  async getUserByPhone(phone) {
    const user = await User.findOne({ phone: phone });
    return user;
  }

  /**
   * Check the email is existing or not
   * @param String email
   * @param String loggedUserId
   * @return User user
   */
  async checkEmailExist(email, loggedUserId) {
    const user = await User.findOne({
      email: email,
      _id: { $ne: loggedUserId },
    });
    return user;
  }

  /**
   * Check the phone is existing or not
   * @param String phone
   * @param String loggedUserId
   * @returns
   */
  async checkPhoneExist(phone, loggedUserId) {
    const user = await User.findOne({
      phone: phone,
      _id: { $ne: loggedUserId },
    });
    return user;
  }
}
