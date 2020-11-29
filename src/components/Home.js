// import  React from "react";

// function Home() {
//     return(
        
//     )
// }

<Router>
<Header/>
<Switch>
  <Route exact path="/admin-panel" component={Admin}/>
  <Route exact path="/edit-user" component={EditUser}/>
</Switch>
</Router>