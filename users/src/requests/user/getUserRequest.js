import Joi from 'joi'
import userRepository from '../../repositories/userRepository.js'
import cleanErrorMessage from '../../utils/cleanErrorMessage.js'

class getUserRequest {
    static userRepo = new userRepository()

    /**
     * Add validation rules for the request
     */
    static schema = Joi.object({
        id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    })

    constructor(data) {
        this.data = data
    }

    async validate() {
        const { error, value } = getUserRequest.schema.validate(this.data, {
            abortEarly: false,
        })

        /**
         * Check id exist or not
         */
        const idExists = await getUserRequest.userRepo.checkIdExists(
            this.data.id
        )

        if (error || idExists == null) { 
            const validationErrors = {}
            error
                ? error.details.forEach((err) => {
                      validationErrors[err.context.key] = cleanErrorMessage(
                          err.message,
                      )
                  })
                : []
            if (idExists == null) {
                validationErrors['id'] = 'Provided id is incorrect'
            }
            throw validationErrors
        }

        return value
    }
}

export default getUserRequest
