import axios from "axios";
import React, { useState } from "react";
import "./Style.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const handleUserNameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleFullNameInput = (e) => {
    setFullName(e.target.value);
  };
  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
      display_name: fullname,
    };
    axios
      .post("/api/auth/register", data)
      .then((response) => {
        window.location.href = "/login";
        console.log(response.status);
      })
      .catch((error) => {
        alert("Register not accessed !!!");
        return Promise.reject(error);
      });
  };
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
                    placeholder="Full Name"
                    onChange={handleFullNameInput}
                  />
                </div>
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
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
