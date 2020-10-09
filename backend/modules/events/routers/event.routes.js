const express = require("express");
const eventRouter = express.Router();
const EventController = require("../controllers/event.controller");

eventRouter.get("/", EventController.getAllEvents);
eventRouter.post("/", EventController.createEvent);
eventRouter.delete("/:id", EventController.deleteEvent);
eventRouter.patch("/:id/waiting_approval", EventController.updateEventStatus);
module.exports = eventRouter;
