const User = require("../models/auth.model")
const expressJwt = require("express-jwt")
const _ = require("lodash")
const { OAuth2Client } = require("google-auth-library")
const fetch = require("node-fetch")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
//Customizado
const { errorHandler } = require("../helpers/dbErrorHandling") 
const sgMail = require("@sendgrid/mail")
//Deveria ser process.env.MAIL_KEY, mas um erro acontecia e a key não era reconhecida, então está hardcoded mesmo
sgMail.setApiKey("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")

exports.registerController = (req, res) => {
    // TESTE DE ROTA
    // res.json({
    //     sucess: true,
    //     message: 'Register route'
    // })

    const { name, email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    error: "Email já cadastrado"
                })
            }
        })

        //Gerar token de acesso
        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: "15m"
            }
        )

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Ativação de conta",
            html: `
                <h1>Clique neste link para ativar sua conta</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr/>
                <p>Não responda a este email</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Email enviado para ${email}`
            })
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })
    }
}