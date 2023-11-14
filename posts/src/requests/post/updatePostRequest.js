import Joi from "joi";
import userRepository from "../../repositories/postRepository.js";
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
    post: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = updateUserRequest.schema.validate(this.data, {
      abortEarly: false,
    });

    /**
     * Check id exist or not
     */
    const idExists = await updateUserRequest.userRepo.checkIdExists(
      this.data.id
    );
    if (error || idExists == null) {
      const validationErrors = {};
      error
        ? error.details.forEach((err) => {
            validationErrors[err.context.key] = cleanErrorMessage(err.message);
          })
        : [];
      if (idExists == null) {
        validationErrors["id"] = "Provided id is incorrect";
      }
      throw validationErrors;
    }

    return value;
  }
}

export default updateUserRequest;
