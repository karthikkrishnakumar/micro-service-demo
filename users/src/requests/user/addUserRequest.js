import Joi from "joi";
import userRepository from "../../repositories/userRepository.js";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class addUserRequest {
  static userRepo = new userRepository();

  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    first_name: Joi.string().required(),
    last_name:Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    password:Joi.string()
        .min(8)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&,.])[A-Za-z\d@$!%^*?&,.]+$/,
        )
        .message(
            'Password must contain at least one lowercase letter, one uppercase letter, one special character, and one digit',
        )
        .required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = addUserRequest.schema.validate(this.data, {
      abortEarly: false,
    });
    /**
     * Check email exist or not
     */
    const checkEmailExists = await addUserRequest.userRepo.getUserByEmail(
      this.data.email
    );

    /**
     * check phone exist or not
     */
    const checkPhoneExists = await addUserRequest.userRepo.getUserByPhone(
      this.data.phone
    );

    if (error || checkEmailExists || checkPhoneExists !== null) {
      const validationErrors = {};
      error
        ? error.details.forEach((err) => {
            validationErrors[err.context.key] = cleanErrorMessage(err.message);
          })
        : [];
      if (checkEmailExists !== null) {
        validationErrors["email"] = "Email id is already taken.";
      }
      if (checkPhoneExists !== null) {
        validationErrors["phone"] = "Phone number is already taken.";
      }
      throw validationErrors;
    }
    return value;
  }
}

export default addUserRequest;
