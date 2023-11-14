import Joi from "joi";
import userRepository from "../../repositories/userRepository.js";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class updateUserRequest {
  static userRepo = new userRepository();

  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = updateUserRequest.schema.validate(this.data, {
      abortEarly: false,
    });

    /**
     * check email is exist or not
     */
    const checkEmailExists = await updateUserRequest.userRepo.checkEmailExist(
      this.data.email,
      this.data.id
    );

    /**
     * check phone is exist or not
     */
    const checkPhoneExists = await updateUserRequest.userRepo.checkPhoneExist(
      this.data.phone,
      this.data.id
    );

    /**
     * Check id exist or not
     */
    const idExists = await updateUserRequest.userRepo.checkIdExists(
      this.data.id
    );
    if (
      error ||
      idExists == null ||
      checkEmailExists !== null ||
      checkPhoneExists !== null
    ) {
      const validationErrors = {};
      error
        ? error.details.forEach((err) => {
            validationErrors[err.context.key] = cleanErrorMessage(err.message);
          })
        : [];
      if (idExists == null) {
        validationErrors["id"] = "Provided id is incorrect";
      }
      if (checkEmailExists !== null) {
        validationErrors["email"] = "Email is existing";
      }
      if (checkPhoneExists !== null) {
        validationErrors["phone"] = "Phone number is existing";
      }
      throw validationErrors;
    }

    return value;
  }
}

export default updateUserRequest;
