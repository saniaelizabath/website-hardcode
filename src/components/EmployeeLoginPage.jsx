// src/components/EmployeeLoginPage.jsx
import { useState } from 'react';
import API from '../api';

const EmployeeLoginPage = ({ setCurrentPage, selectedEmployee, setLoggedInEmployee }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('employee_id', selectedEmployee.id);

      const response = await API.post('/employee/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store logged in employee info
      setLoggedInEmployee(response.data.employee);
      
      // Redirect to employee dashboard
      setCurrentPage(`employee-dashboard-${selectedEmployee.id}`);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32 px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('employee-portal')}
          className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Employee Portal
        </button>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
          {/* Employee Info Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedEmployee.name}
            </h2>
            <p className="text-blue-300">Login to your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-center text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-blue-300 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-slate-900 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-blue-300 mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-900 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('employee-forgot-password')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>Default credentials for testing:</p>
          <p className="text-blue-300 mt-1">Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;