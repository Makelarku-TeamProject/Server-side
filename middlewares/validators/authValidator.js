const {body, validationResult} = require('express-validator')

// TODO: validator register
const validateRegister = () => {
    return [
        body('username').notEmpty().withMessage('username is required'),
        body('email').isEmail().withMessage('username is required'),
        body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
        body('role').isIn(['admin','customer', 'member']).withMessage('role must be either customer or member')
    ]
}

// TODO: validator login
const validateLogin = () => {
    return [
        body('email').isEmail().withMessage('email is required'),
        body('password').notEmpty().withMessage('password is required')
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

validateRegister.validate = validate
validateLogin.validate = validate

module.exports = {
    validateRegister,
    validateLogin
}