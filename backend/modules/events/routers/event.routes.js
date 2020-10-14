const express = require("express");
const eventRouter = express.Router();

//Carregar controllers
const EventController = require("../controllers/event.controller");
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController
} = require("../controllers/auth.controller");
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/validator')

//Rotas de form e homepage
eventRouter.get("/", EventController.getAllEvents);
eventRouter.post("/", EventController.createEvent);
eventRouter.delete("/:id", EventController.deleteEvent);
eventRouter.patch("/:id/waiting_approval", EventController.updateEventStatus);

//Rotas de login
eventRouter.post("/register", validSign, registerController);
eventRouter.post('/activation', activationController)
eventRouter.post('/login', validLogin, signinController)
eventRouter.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
eventRouter.put('/resetpassword', resetPasswordValidator, resetPasswordController);


module.exports = eventRouter;
