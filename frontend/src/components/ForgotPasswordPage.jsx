import { useState } from "react";
import API from "../api";

const ForgotPasswordPage = ({ setCurrentPage }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await API.post("/auth/forgot-password");
      setMessage("Reset link has been sent to admin email.");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>

        {message && <p className="text-green-400 mb-4">{message}</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <p className="text-blue-200 text-sm mb-6 text-center">
          A reset link will be sent to the registered admin email.
        </p>

        <button className="w-full py-3 bg-blue-600 text-white font-semibold">
          Send Reset Link
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage("admin-login")}
          className="w-full mt-4 text-blue-400 text-sm"
        >
          Back to login
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
