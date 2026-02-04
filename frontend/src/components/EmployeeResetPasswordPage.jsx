// src/components/EmployeeResetPasswordPage.jsx
import { useState } from 'react';
import API from '../api';

const EmployeeResetPasswordPage = ({ setCurrentPage, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('new_password', password);

      await API.post('/employee/reset-password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Password reset successful! Redirecting to employee portal...');

      setTimeout(() => {
        setCurrentPage('employee-portal');
      }, 2000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.detail || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Reset Password
            </h2>
            <p className="text-blue-300">Enter your new password</p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center text-sm">{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-center text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-blue-300 mb-2 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-slate-900 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
              <p className="text-slate-400 text-xs mt-1">
                Password must be at least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-blue-300 mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-slate-900 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('employee-portal')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Back to Employee Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeResetPasswordPage;