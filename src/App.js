import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import{Grid} from "@material-ui/core"
import Admin from "./components/Admin";
import AdminForum from "./components/AdminForum";
import Header from "./components/Header";
import EditUser from "./components/EditUser";
import ForumContent from "./components/ForumContent";
import SignupForm from "./components/SignUp";
import Login from "./components/Login";
import WritePost from "./components/WritePost";
import Profile from "./components/userDetails";
import EditPost from "./components/EditPost";

function App () {
  
  return(
    <div>
     <Grid container direction="column" spacing={2}>
      <Router>
      <Grid item> 
          <Header/>
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2}></Grid>
          <Switch>
            <Grid item xs={12} sm={8}>
              <Route exact path="/admin-panel-user" component={Admin}/>
              <Route exact path="/admin-panel-forum" component={AdminForum}/>
              <Route exact path="/edit-user" component={EditUser}/>
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/sign-up" component={SignupForm}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/send-a-notice" component={WritePost}/>
              <Route exact path="/edit-post/:id" component={EditPost}></Route>
              <Route exact path="/" component={ForumContent}/>
            </Grid>
          </Switch>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
      </Router>
     </Grid>
    </div>
  )
}

export default App;
