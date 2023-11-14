import Joi from "joi";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

class listUserRequest {
  /**
   * Add validation rules for the request
   */
  static schema = Joi.object({
    id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
})

  constructor(data) {
    this.data = data;
  }

  async validate() {
    const { error, value } = listUserRequest.schema.validate(this.data, {
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

export default listUserRequest;
