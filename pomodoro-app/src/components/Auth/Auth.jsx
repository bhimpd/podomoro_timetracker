import React, { useState } from "react";
import authService from "../../services/authService";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await authService.login(email, password);
      } else {
        response = await authService.register(name, email, password, password_confirmation);
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      window.location.reload();
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="alert alert-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                className="form-control"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
