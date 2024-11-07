import joi from 'joi'

export const registerSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    mobile: joi.string().regex(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be atleast 10 digits'
    }),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be atleast 8 characters long and contain letters and numbers'
    }),
    profileImageUrl: joi.string()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be atleast 8 characters long and contain letters and numbers'
    })         
})