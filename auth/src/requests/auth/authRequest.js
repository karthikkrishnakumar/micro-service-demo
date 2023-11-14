import Joi from "joi";
import cleanErrorMessage from "../../utils/cleanErrorMessage.js";

/**
 * Add validation rules for the request
 */
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/**
 * Check if the request is valid
 */
class authRequest {
  static validate(request) {
    const { error, value } = schema.validate(request, { abortEarly: false });

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

export default authRequest;
