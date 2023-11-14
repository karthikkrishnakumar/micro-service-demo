import Joi from "joi";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class listPostsByUserIdRequest {
  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    user_id: Joi.string().required(),
  });

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = listPostsByUserIdRequest.schema.validate(this.data, {
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

export default listPostsByUserIdRequest;
