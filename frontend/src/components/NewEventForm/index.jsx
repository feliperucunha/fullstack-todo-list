import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "120vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    height: "100%",
    marginTop: "5% ",
  },
  title: {
    flexGrow: 1,
  },
  textInput: {
    width: "90%",
  },
  lineContainer: {
    display: "flex",
    width: "90%",
  },
  button: {
    width: "50%",
    height: "56px",
    marginTop: "20px",
  },
}));
export default function NewEventForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [name, setName] = useState("");
  const [improve, setImprove] = useState("");
  const [keep, setKeep] = useState("");
  const [sugestions, setSugestions] = useState("");
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("2020-10-09");
  const handleFormSubmit = () => {
    const newEvent = {
      name,
      date,
      improve,
      keep,
      sugestions,
      feedback
    };
    setIsWaitingResponse(true);
    axios
      .post("http://localhost:5000/events", newEvent)
      .then((res) => {
        console.log(res);
        setOpen(true);
        setIsWaitingResponse(false);
      })
      .catch((err) => console.log(err));
  };

  const handleClearForm = () => {
    const newEvent = {
      name: "",
      date: "",
      improve: "",
      keep: "",
      sugestions: "",
      feedback: "",
    };
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={8} className={classes.paper}>
        <div className={classes.lineContainer}>
          <TextField
            style={{ width: "70%" }}
            variant="outlined"
            label="Usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            style={{ width: "25%", marginLeft: "5%" }}
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Pontos a melhorar"
          multiline={true}
          rows={5}
          value={improve}
          onChange={(e) => setImprove(e.target.value)}
        />
        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Pontos a manter"
          multiline={true}
          rows={5}
          value={keep}
          onChange={(e) => setKeep(e.target.value)}
        />
        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Sugestões"
          multiline={true}
          rows={5}
          value={sugestions}
          onChange={(e) => setSugestions(e.target.value)}
        />
        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Feedback final"
          multiline={true}
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />                                
      </Paper>
      <Button
        onClick={handleFormSubmit}
        onChange={handleClearForm}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {isWaitingResponse ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Enviar Feedback"
        )}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Feedback criado com sucesso!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
