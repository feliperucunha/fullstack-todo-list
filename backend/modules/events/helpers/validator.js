const {
    check
} = require('express-validator');

exports.validSign = [
    check('name', 'Insira seu nome').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('O nome deve ter entre 3 e 32 caracteres'),
    check('email')
    .isEmail()
    .withMessage('Email inválido'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Sua senha deve conter mais de 6 dígitos').matches(/\d/).withMessage('Sua senha precisa de um número')
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Email inválido'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Sua senha deve conter mais de 6 dígitos').matches(/\d/).withMessage('Sua senha precisa de um número')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Email inválido')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Sua senha deve conter mais de 6 dígitos')
];