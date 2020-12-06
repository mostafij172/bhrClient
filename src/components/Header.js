import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginIcon from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Send from "@material-ui/icons/Send";


const useStyles = makeStyles((theme) => ({
  typographyStyle: {
      flex: 1
  },
  appBarBG: {
    backgroundColor: "#657fdf"
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Typography className={classes.typographyStyle}> <Link to="/">BHR Development Foundation</Link></Typography>
          <Button color="primary" startIcon={<Send/>} endIcon={<MonetizationOn/>} variant="contained">Send money</Button>
          <Link to="/sign-up"><Button color="primary" endIcon={<LoginIcon/>} variant="contained">sign up</Button ></Link>
          <Link to="/login"><Button color="primary" endIcon={<VpnKey/>} variant="contained">login</Button ></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
