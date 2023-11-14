import Joi from "joi";
import postRepository from "../../repositories/postRepository.js";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class addPostRequest {
  static postRepo = new postRepository();

  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    post: Joi.string().required(),
    user_id:Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = addPostRequest.schema.validate(this.data, {
      abortEarly: false,
    });
   

    if (error) {
      const validationErrors = {};
      error
        ? error.details.forEach((err) => {
            validationErrors[err.context.key] = cleanErrorMessage(err.message);
          })
        : [];
      throw validationErrors;
    }
    return value;
  }
}

export default addPostRequest;
