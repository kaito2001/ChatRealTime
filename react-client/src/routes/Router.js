import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginForm from "../application/Login/Login-Form";
import RegisterForm from "../application/Login/Register-Form";
import Cookies from "js-cookie";
import { ChatRoom } from "../components/Messenger/ChatRoom/ZoomChat/ChatRoom";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (authed ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default function Routing() {
  const data = useSelector((state) => state.User);
  Cookies.set("token", data.token);
  const accessToken = !!Cookies.get("token");
  return (
    <Router>
      <Switch>
        <Route exact strict path="/login" component={LoginForm} />
        <Route exact strict path="/register" component={RegisterForm} />
        <PrivateRoute
          authed={accessToken}
          exact
          strict
          path="/"
          component={ChatRoom}
        />
      </Switch>
    </Router>
  );
}
