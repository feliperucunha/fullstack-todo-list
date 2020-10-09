const express = require("express");
const eventRouter = express.Router();

//Carregar controllers
const EventController = require("../controllers/event.controller");
const RegisterController = require("../controllers/auth.controller");

//Rotas de form e homepage
eventRouter.get("/", EventController.getAllEvents);
eventRouter.post("/", EventController.createEvent);
eventRouter.delete("/:id", EventController.deleteEvent);
eventRouter.patch("/:id/waiting_approval", EventController.updateEventStatus);

//Rotas de login
eventRouter.post("/register", RegisterController.registerController);

module.exports = eventRouter;
