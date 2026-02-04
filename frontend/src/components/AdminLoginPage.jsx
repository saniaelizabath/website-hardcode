// src/components/AdminLoginPage.jsx
import { useState } from "react";
import API from "../api";

const AdminLoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await API.post("/auth/login", formData);
      localStorage.setItem("admin_token", res.data.access_token);

      setCurrentPage("admin-dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md border border-blue-500/20"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 bg-slate-900 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 bg-slate-900 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right mb-6">
          <button
            type="button"
            onClick={() => setCurrentPage("forgot-password")}
            className="text-sm text-cyan-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
