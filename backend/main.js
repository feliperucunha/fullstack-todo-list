const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRouter = require("./modules/events/routers/event.routes");
const bodyParser = require('body-parser');
const morgan = require("morgan");

require('dotenv').config({
  path: './backend/config/config.env'
})

const app = express();
app.use(express.json());
app.use(cors());
//Routes
app.use("/events", eventRouter);

//bodyParser
app.use(bodyParser.json());

//Dev Config
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))
}

//DB Connection
mongoose
  .connect("mongodb://localhost/test", {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: true,
     useUnifiedTopology: true
    })
  .then((con) => {
    console.log("Conectado ao banco de dados [1/2]");
  })
  .catch((err) => {
    console.log(err);
  });

// NOT FOUND PAGE
app.use((req, res, next) => {
  res.status(404).json({
    sucess: false,
    message: "Página não encontrada"
  })
})  

//Port connection
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT} [2/2]`);
});
