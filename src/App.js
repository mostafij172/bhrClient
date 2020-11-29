import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import{Grid} from "@material-ui/core"
import Admin from "./components/Admin";
import Header from "./components/Header";
import EditUser from "./components/EditUser";
import ForumContent from "./components/ForumContent";
// import SignUp from './components/SignUp'

function App () {
  
  return(
    <div>
     <Grid container direction="column" spacing={2}>
      <Grid item> 
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/admin-panel" component={Admin}/>
            <Route exact path="/edit-user" component={EditUser}/>
          </Switch>
        </Router>
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2}></Grid>
        <Router>
          <Switch>
            <Grid item xs={12} sm={8}>
            <Route exact path="/" component={ForumContent}/>
            </Grid>
          </Switch>
        </Router>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
     </Grid>
    </div>
  )
}

export default App;