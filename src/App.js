import Signup from "./components/user/Signup.js";
import Login from "./components/user/Login.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import PrivateRoute from "./components/user/PrivateRoute.js";
import "./App.css";

function App() {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={Dashboard}
                className="w-100"
                style={{ width: "100vw"}}
              />
                <Route
                  path="/signup"
                  component={Signup}
                  className="d-flex w-100"
                  style={{ maxWidth: "400px"}}
                />
                <Route
                  path="/login"
                  component={Login}
                  className="d-flex w-100"
                  style={{ maxWidth: "400px"}}
                />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
