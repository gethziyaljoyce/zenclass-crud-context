import "./App.css";
import Nav from "./Nav";
import Users from "./Users";
import User from "./User";
import Create from "./Create";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UsersProvider } from "./UsersContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UsersProvider>
          <Nav />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route exact path="/" component={Users} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </UsersProvider>
      </div>
    </Router>
  );
}

export default App;
