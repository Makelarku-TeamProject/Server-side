const { body, validationResult } = require('express-validator')

// TODO: validator category
const validateCategory = () => {
    return [
        body('name').notEmpty().withMessage('name is required'), 
    ]
}

// * middleware untuk check hasil validasi
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }
    next()
}

validateCategory.validate = validate

module.exports = validateCategory