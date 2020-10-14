const User = require("../models/auth.model")
const expressJwt = require("express-jwt")
const _ = require("lodash")
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

exports.resetPasswordController = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
          err,
          decoded
        ) {
          if (err) {
            return res.status(400).json({
              error: 'Link expirado, tente novamente'
            });
          }
  
          User.findOne(
            {
              resetPasswordLink
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: 'Algo deu errado'
                });
              }
  
              const updatedFields = {
                password: newPassword,
                resetPasswordLink: ''
              };
  
              user = _.extend(user, updatedFields);
  
              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: 'Erro ao resetar senha'
                  });
                }
                res.json({
                  message: `Tudo pronto, pode entrar com sua nova senha`
                });
              });
            }
          );
        });
      }
    }
  };

  
  exports.forgotPasswordController = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      User.findOne(
        {
          email
        },
        (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: 'Nenhum email correspondente na base de dados'
            });
          }
  
          const token = jwt.sign(
            {
              _id: user._id
            },
            process.env.JWT_RESET_PASSWORD,
            {
              expiresIn: '10m'
            }
          );
  
          const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Redefinir sua senha`,
            html: `
                      <h1>Clique no link abaixo para redefinir sua senha</h1>
                      <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                      <hr />
                      <p>${process.env.CLIENT_URL}</p>
                  `
          };
  
          return user.updateOne(
            {
              resetPasswordLink: token
            },
            (err, success) => {
              if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                  error:
                    'Erro no banco de dados ao resetar senha'
                });
              } else {
                sgMail
                  .send(emailData)
                  .then(sent => {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                      message: `Email enviado para ${email}. Siga as instruções para ativar sua conta`
                    });
                  })
                  .catch(err => {
                    // console.log('SIGNUP EMAIL SENT ERROR', err)
                    return res.json({
                      message: err.message
                    });
                  });
              }
            }
          );
        }
      );
    }
  };


//exports.requireSignin = expressJwt({
 //   secret: process.env.JWT_SECRET, algorithms: // req.user._id
 // });
  
  exports.adminMiddleware = (req, res, next) => {
    User.findById({
      _id: req.user._id
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'Usuário não encontrado'
        });
      }
  
      if (user.role !== 'admin') {
        return res.status(400).json({
          error: 'Acesso negado.'
        });
      }
  
      req.profile = user;
      next();
    });
  };

  exports.signinController = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      // check if user exist
      User.findOne({
        email
      }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            errors: 'Email não cadastrado'
          });
        }
        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            errors: 'Email e/ou senha errados'
          });
        }
        // generate a token and send to client
        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d'
          }
        );
        const { _id, name, email, role } = user;
  
        return res.json({
          token,
          user: {
            _id,
            name,
            email,
            role
          }
        });
      });
    }
  };


  exports.activationController = (req, res) => {
    const { token } = req.body;
  
    if (token) {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if (err) {
          console.log('Activation error');
          return res.status(401).json({
            errors: 'Link expirado, tente novamente'
          });
        } else {
          const { name, email, password } = jwt.decode(token);
  
          console.log(email);
          const user = new User({
            name,
            email,
            password
          });
  
          user.save((err, user) => {
            if (err) {
              console.log('Save error', errorHandler(err));
              return res.status(401).json({
                errors: errorHandler(err)
              });
            } else {
              return res.json({
                success: true,
                message: user,
                message: 'Cadastro realizado'
              });
            }
          });
        }
      });
    } else {
      return res.json({
        message: 'Algo deu errado'
      });
    }
  };