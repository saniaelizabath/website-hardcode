// src/components/ResetPasswordPage.jsx
import { useState } from "react";
import API from "../api";

const ResetPasswordPage = ({ token, setCurrentPage }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    try {
      // Send as FormData to match FastAPI Form expectations
      const formData = new FormData();
      formData.append("token", token);
      formData.append("new_password", password);

      await API.post("/auth/reset-password", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Password reset successful! Redirecting to login...");

      setTimeout(() => {
        setCurrentPage("admin-login");
      }, 2000);
    } catch (err) {
      console.error("Reset error:", err);
      setError(err.response?.data?.detail || "Invalid or expired reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32">
      <form
        onSubmit={handleReset}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md border border-blue-500/20"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-300 text-center">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-blue-300 mb-2 text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            required
            placeholder="Enter your new password"
            className="w-full px-4 py-3 bg-slate-900 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
          <p className="text-slate-400 text-xs mt-1">
            Password must be at least 6 characters
          </p>
        </div>

        <button 
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Reset Password
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setCurrentPage("admin-login")}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;