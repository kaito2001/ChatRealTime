import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { addUser } from "../../store/action";
import "./Style.css";

export default function LoginForm() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUserNameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      username: username,
      password: password,
    };
    await axios
      .post("/api/auth/login", data)
      .then((response) => {
        setUser(response.data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(user);
    if (user.uid !== undefined) {
      dispatch(addUser(user));
    }
  }, [user]);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card mt-5">
            <div className="card-header">
              <h3>Sign up</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square" />
                </span>
                <span>
                  <i className="fab fa-google-plus-square" />
                </span>
                <span>
                  <i className="fab fa-twitter-square" />
                </span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    onChange={handleUserNameInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Pass Word"
                    onChange={handlePasswordInput}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="login-btn float-right"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <Link to="/register">Sign up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <a href="http://localhost:3000">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
