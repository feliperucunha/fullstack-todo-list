import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar style={{ minHeight: "100px" }}>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ textDecoration: "none", color: "inherit", fontSize: "25px", fontWeight: "bold" }} to="/">
              Teste Viasoft
            </Link>
          </Typography>
          <Button variant="outlined" color="primary">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/events/new"
            >
              Criar Feedback
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
