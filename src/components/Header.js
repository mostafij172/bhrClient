import React from 'react';
import {Link, useHistory} from "react-router-dom";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginIcon from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Send from "@material-ui/icons/Send";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  typographyStyle: {
      flex: 1
  },
  appBarBG: {
    backgroundColor: "#657fdf"
  }
}));



export default function Header(props) {
  let history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const token = localStorage.getItem('authToken');
  let decodedRole;
  let decodedUser;
  if(!token) {
    decodedRole = null;
    decodedUser = null;
  } else {
    decodedRole = jwt_decode(token).role;
    decodedUser = jwt_decode(token).id;
    console.log(decodedUser)
  }
  
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Typography className={classes.typographyStyle}> <Link to="/">BHR Development Foundation</Link></Typography>
          {
            localStorage.getItem('authToken') ? <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
              >
              <Link to={`/profile/${decodedUser}`}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
              <Link to="/send-a-notice"><MenuItem onClick={handleClose}>Write new Post</MenuItem></Link>
              <MenuItem onClick={handleClose}>Send Money</MenuItem>
              {decodedRole === "admin" ? <Link to="/admin-panel-user"> <MenuItem onClick={handleClose}>All Users</MenuItem> </Link> : null}
              {decodedRole === "admin" ? <Link to="/admin-panel-forum" ><MenuItem onClick={handleClose}>All Forum Posts</MenuItem></Link> : null}
              <MenuItem onClick={function() {
                localStorage.removeItem('authToken');
                history.push('/login')
              }}>Logout</MenuItem>
              
            </Menu>
          </div> : <div>
          <Link to="/sign-up"><Button color="primary" endIcon={<LoginIcon/>} variant="contained">sign up</Button ></Link>
          <Link to="/login"><Button color="primary" endIcon={<VpnKey/>} variant="contained">login</Button ></Link>
          </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
