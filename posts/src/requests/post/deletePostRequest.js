import Joi from "joi";
import postRepository from "../../repositories/postRepository.js";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class deletePostRequest {
  static postRepo = new postRepository();

  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = deletePostRequest.schema.validate(this.data, {
      abortEarly: false,
    });

    /**
     * Check id exist or not
     */
    const idExists = await deletePostRequest.postRepo.checkIdExists(
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

export default deletePostRequest;
