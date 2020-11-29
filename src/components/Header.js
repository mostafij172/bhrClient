import React from 'react';
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
        <Typography className={classes.typographyStyle}> <a href="/">BHR Development Foundation</a></Typography>
          <Button color="primary" startIcon={<Send/>} endIcon={<MonetizationOn/>} variant="contained">Send money</Button>
          <Button color="primary" endIcon={<LoginIcon/>} variant="contained">Login</Button >
          <Button color="primary" endIcon={<VpnKey/>} variant="contained">Sign Up</Button >
        </Toolbar>
      </AppBar>
    </div>
  );
}
