// src/components/EmployeePortalPage.jsx
import { useState, useEffect } from 'react';
import API from '../api';

const EmployeePortalPage = ({ setCurrentPage, setSelectedEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get('/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentPage('employee-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-32">
        <div className="text-white text-xl">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Employee Portal
          </h1>
          <p className="text-blue-300 text-lg">
            Select your profile to login and mark attendance
          </p>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employees.map((employee, index) => (
            <button
              key={employee.id}
              onClick={() => handleEmployeeClick(employee)}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Employee Icon */}
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
              </div>

              {/* Employee Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {employee.name}
              </h3>
              
              {/* Employee ID Badge */}
              <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 px-4 py-1 rounded-full">
                <span className="text-cyan-400 text-sm font-medium">
                  ID: {employee.id}
                </span>
              </div>

              {/* Hover Effect Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg 
                  className="w-6 h-6 text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg 
                className="w-6 h-6 text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">
                Important Information
              </h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• You must be at the office location to mark attendance</li>
                <li>• Mark your IN time when you arrive</li>
                <li>• Mark your OUT time when you leave</li>
                <li>• View your attendance history in your dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortalPage;