import User from "../model/user.js";

export default class userRepository {
  
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

/**
   * Get User
   * @param String userId
   * @return User
   */
async getUser(userId) {
  return User.findById(userId);
}

}
