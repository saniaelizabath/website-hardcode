import { useState, useEffect } from "react";
import API from "../api";

// ─────────────────────────────────────────
// Icons used in the Quick Links cards (employee side uses the same set)
// ─────────────────────────────────────────
const LINK_ICONS = {
  attendance_url:     "👥",
  project_report_url: "📋",
  timesheet_url:      "⏰",
  policy_hub_url:     "📚",
  inventory_url:      "📦",
  petty_cash_url:     "💰",
  salary_advance_url: "💵",
  approved_pr_url:    "✅",
};

const AdminDashboard = ({ newsEvents, setNewsEvents, careers, setCareers }) => {
  const [activeTab, setActiveTab] = useState("news");

  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingCareerId, setEditingCareerId] = useState(null);

  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    imagePreview: "",
  });

  const [careerForm, setCareerForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  // Employee Management States
  const [employees, setEmployees] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  // Attendance states
  const [attendanceData, setAttendanceData] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Enhanced Filter States
  const [filterType, setFilterType] = useState('today');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
  const [customWeekStart, setCustomWeekStart] = useState('');
  const [customWeekEnd, setCustomWeekEnd] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ─────────────────────────────────────────
  // Employee Links states
  // ─────────────────────────────────────────
  const [linksConfig, setLinksConfig] = useState([]);
  const [selectedEmployeeForLinks, setSelectedEmployeeForLinks] = useState(null);
  const emptyLinksForm = () => {
    const obj = {};
    linksConfig.forEach(item => { obj[item.key] = ""; });
    return obj;
  };
  const [linksForm, setLinksForm] = useState({});
  const [linksSaved, setLinksSaved] = useState(true);
  
  // Individual link editing
  const [editingLinkKey, setEditingLinkKey] = useState(null);
  const [editingLinkValue, setEditingLinkValue] = useState("");

  // ─────────────────────────────────────────
  // Admin Links states (admin's own Excel sheets)
  // ─────────────────────────────────────────
  const [adminLinks, setAdminLinks] = useState([]);
  const [adminLinkForm, setAdminLinkForm] = useState({
    name: "",
    url: ""
  });
  const [editingAdminLinkId, setEditingAdminLinkId] = useState(null);

  // =========================
  // AUTH GUARD
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  // =========================
  // LOAD DATA
  // =========================
  const loadNews = async () => {
    try {
      const res = await API.get("/news");
      setNewsEvents(
        res.data.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          date: item.date,
          image: `http://127.0.0.1:8000/${item.image_path}`,
        }))
      );
    } catch (err) {
      console.error("Error loading news:", err);
    }
  };

  const loadCareers = async () => {
    try {
      const res = await API.get("/jobs");
      setCareers(
        res.data.map((job) => ({
          id: job._id,
          title: job.title,
          description: job.description,
          location: job.location,
        }))
      );
    } catch (err) {
      console.error("Error loading careers:", err);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees:", err);
    }
  };

  const loadLinksConfig = async () => {
    try {
      const res = await API.get("/employee-links/config");
      setLinksConfig(res.data.links);
    } catch (err) {
      console.error("Error loading links config:", err);
    }
  };

  const loadAdminLinks = async () => {
    try {
      const res = await API.get("/admin-links");
      setAdminLinks(res.data);
    } catch (err) {
      console.error("Error loading admin links:", err);
    }
  };

  const getFilterQuery = () => {
    switch (filterType) {
      case 'today':
        return `?filter=today`;
      case 'week':
        return `?filter=week`;
      case 'month':
        return `?filter=month`;
      case 'custom-date':
        return `?date=${customDate}`;
      case 'custom-week':
        return `?start_date=${customWeekStart}&end_date=${customWeekEnd}`;
      case 'custom-month':
        return `?month=${selectedMonth}&year=${selectedYear}`;
      default:
        return `?filter=today`;
    }
  };

  const loadAttendance = async () => {
    setLoadingAttendance(true);
    try {
      const query = getFilterQuery();
      const res = await API.get(`/attendance/all${query}`);
      setAttendanceData(res.data);
    } catch (err) {
      console.error("Error loading attendance:", err);
      alert("Failed to load attendance data");
    } finally {
      setLoadingAttendance(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'attendance') {
      loadAttendance();
    }
  }, [activeTab, filterType, customDate, customWeekStart, customWeekEnd, selectedMonth, selectedYear]);

  useEffect(() => {
    loadNews();
    loadCareers();
    loadEmployees();
    loadLinksConfig();
    loadAdminLinks();
  }, []);

  // =========================
  // EMPLOYEE MANAGEMENT
  // =========================
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = {
        id: parseInt(employeeForm.id),
        name: employeeForm.name,
        email: employeeForm.email,
        password_hash: employeeForm.password,
      };

      if (editingEmployeeId) {
        await API.put(`/employees/${editingEmployeeId}`, employeeData);
        alert("Employee updated successfully!");
        setEditingEmployeeId(null);
      } else {
        await API.post("/employees", employeeData);
        alert("Employee added successfully!");
      }

      await loadEmployees();
      setEmployeeForm({ id: "", name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to save employee: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployeeId(employee.id);
    setEmployeeForm({
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email,
      password: "",
    });
  };

  const handleDeleteEmployee = async (employeeId, employeeName) => {
    if (!window.confirm(`Delete employee: ${employeeName}? This will also delete all their attendance records and links.`)) return;

    try {
      await API.delete(`/employees/${employeeId}`);
      await loadEmployees();
      if (selectedEmployeeForLinks === employeeId) {
        setSelectedEmployeeForLinks(null);
        setLinksForm(emptyLinksForm());
      }
      alert("Employee deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee: " + (err.response?.data?.detail || err.message));
    }
  };

  // =========================
  // EMPLOYEE LINKS MANAGEMENT
  // =========================

  const handleSelectEmployeeForLinks = async (employeeId) => {
    if (!employeeId) {
      setSelectedEmployeeForLinks(null);
      setLinksForm(emptyLinksForm());
      return;
    }

    const empId = parseInt(employeeId);
    setSelectedEmployeeForLinks(empId);

    try {
      const res = await API.get(`/employee-links/${empId}`);
      const form = {};
      linksConfig.forEach(item => {
        form[item.key] = res.data[item.key] || "";
      });
      setLinksForm(form);
      setLinksSaved(true);
    } catch (err) {
      console.error("Failed to fetch links for employee:", err);
      setLinksForm(emptyLinksForm());
    }
  };

  const handleSaveLinks = async () => {
    if (!selectedEmployeeForLinks) return;

    try {
      await API.put(`/employee-links/${selectedEmployeeForLinks}`, linksForm);
      setLinksSaved(true);
      alert("Links saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save links: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleDeleteLinks = async () => {
    if (!selectedEmployeeForLinks) return;
    const emp = employees.find(e => e.id === selectedEmployeeForLinks);
    if (!window.confirm(`Delete all links for ${emp?.name || "this employee"}?`)) return;

    try {
      await API.delete(`/employee-links/${selectedEmployeeForLinks}`);
      setLinksForm(emptyLinksForm());
      setLinksSaved(true);
      alert("Links deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete links: " + (err.response?.data?.detail || err.message));
    }
  };

  // ← NEW: Individual link editing functions
  const handleStartEditLink = (linkKey) => {
    setEditingLinkKey(linkKey);
    setEditingLinkValue(linksForm[linkKey] || "");
  };

  const handleCancelEditLink = () => {
    setEditingLinkKey(null);
    setEditingLinkValue("");
  };

  const handleSaveSingleLink = async (linkKey) => {
    if (!selectedEmployeeForLinks) return;

    try {
      const formData = new FormData();
      formData.append("url", editingLinkValue);

      await API.patch(`/employee-links/${selectedEmployeeForLinks}/${linkKey}`, formData);
      
      // Update local state
      setLinksForm(prev => ({ ...prev, [linkKey]: editingLinkValue }));
      setEditingLinkKey(null);
      setEditingLinkValue("");
      alert(`${LINK_ICONS[linkKey]} Link updated successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to update link: " + (err.response?.data?.detail || err.message));
    }
  };

  // =========================
  // ADMIN LINKS MANAGEMENT
  // =========================
  
  const handleAdminLinkSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", adminLinkForm.name);
      formData.append("url", adminLinkForm.url);

      if (editingAdminLinkId) {
        await API.put(`/admin-links/${editingAdminLinkId}`, formData);
        alert("Link updated successfully!");
        setEditingAdminLinkId(null);
      } else {
        await API.post("/admin-links", formData);
        alert("Link added successfully!");
      }

      await loadAdminLinks();
      setAdminLinkForm({ name: "", url: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to save link: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleEditAdminLink = (link) => {
    setEditingAdminLinkId(link._id);
    setAdminLinkForm({
      name: link.name,
      url: link.url
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAdminLink = async (linkId, linkName) => {
    if (!window.confirm(`Delete link: ${linkName}?`)) return;

    try {
      await API.delete(`/admin-links/${linkId}`);
      await loadAdminLinks();
      alert("Link deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete link: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleOpenAdminLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // =========================
  // IMAGE PREVIEW
  // =========================
  const handleNewsImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewsForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // =========================
  // NEWS CRUD
  // =========================
  const handleNewsSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newsForm.title);
      formData.append("description", newsForm.description);
      formData.append("date", newsForm.date);

      if (newsForm.image) {
        formData.append("image", newsForm.image);
      }

      if (editingNewsId) {
        await API.put(`/news/${editingNewsId}`, formData);
        setEditingNewsId(null);
        alert("News/Event updated successfully!");
      } else {
        await API.post("/news", formData);
        alert("News/Event added successfully!");
      }

      await loadNews();
      setNewsForm({
        title: "",
        description: "",
        date: "",
        image: null,
        imagePreview: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save news: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleEditNews = (item) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      description: item.description,
      date: item.date,
      image: null,
      imagePreview: item.image,
    });
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Delete this news/event?")) return;
    try {
      await API.delete(`/news/${id}`);
      await loadNews();
      alert("News/Event deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete news: " + (err.response?.data?.detail || err.message));
    }
  };

  // =========================
  // CAREER CRUD
  // =========================
  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCareerId) {
        await API.put(`/jobs/${editingCareerId}`, careerForm);
        setEditingCareerId(null);
        alert("Career updated successfully!");
      } else {
        await API.post("/jobs", careerForm);
        alert("Career added successfully!");
      }

      await loadCareers();
      setCareerForm({ title: "", description: "", location: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to save career: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleEditCareer = (job) => {
    setEditingCareerId(job.id);
    setCareerForm({
      title: job.title,
      description: job.description,
      location: job.location,
    });
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      await loadCareers();
      alert("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job: " + (err.response?.data?.detail || err.message));
    }
  };

  // =========================
  // ATTENDANCE FUNCTIONS
  // =========================
  const handleDeleteAttendanceRecord = async (attendanceId, employeeName) => {
    if (!window.confirm(`Delete this attendance record for ${employeeName}?`)) return;

    try {
      await API.delete(`/attendance/${attendanceId}`);
      await loadAttendance();
      alert("Attendance record deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete attendance: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleDeleteEmployeeAttendance = async (employeeId, employeeName) => {
    if (!window.confirm(`Delete all attendance records for ${employeeName} in this period?`)) return;

    try {
      const query = getFilterQuery().replace('?', '');
      const res = await API.delete(`/attendance/employee/${employeeId}?${query}`);
      await loadAttendance();
      alert(`Deleted ${res.data.deleted_count} attendance record(s) successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete attendance: " + (err.response?.data?.detail || err.message));
    }
  };

  const formatTime = (datetime) => {
    if (!datetime) return '-';
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">

        {/* HEADER + LOGOUT - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
              Admin <span className="text-cyan-400">Dashboard</span>
            </h1>
            <p className="text-blue-200 text-sm sm:text-base">Manage website content and postings</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-500/20 border border-red-500/40 text-red-400 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-500/30 transition-all duration-300 font-semibold text-sm sm:text-base"
          >
            Logout
          </button>
        </div>

        {/* TABS - Mobile Scrollable */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="flex gap-10 sm:gap-12 bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm overflow-x-auto scrollbar-hide">
            {[
              { key: "news",       label: "📰", fullLabel: "News & Events" },
              { key: "careers",    label: "💼", fullLabel: "Careers"       },
              { key: "employees",  label: "👥", fullLabel: "Employees"     },
              { key: "attendance", label: "📊", fullLabel: "Attendance"    },
              { key: "admin-links", label: "📎", fullLabel: "My Links"     },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "text-blue-300 hover:bg-slate-700/50"
                }`}
              >
                <span className="sm:hidden">{tab.label}</span>
                <span className="hidden sm:inline">{tab.label} {tab.fullLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* NEWS TAB */}
        {activeTab === "news" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <form onSubmit={handleNewsSubmit} className="space-y-3 sm:space-y-4 bg-slate-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {editingNewsId ? "✏️ Edit News/Event" : "➕ Add News/Event"}
              </h3>

              <input
                type="text"
                value={newsForm.title}
                onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                required
                placeholder="Title"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base"
              />

              <input
                type="date"
                value={newsForm.date}
                onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base"
              />

              <div className="space-y-2">
                <label className="text-blue-300 text-xs sm:text-sm font-semibold">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewsImageChange}
                  required={!editingNewsId}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 text-xs sm:text-sm"
                />
              </div>

              {newsForm.imagePreview && (
                <div className="relative">
                  <img src={newsForm.imagePreview} className="h-32 sm:h-40 w-full object-cover rounded-lg border border-cyan-500/30" alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setNewsForm({ ...newsForm, image: null, imagePreview: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}

              <textarea
                value={newsForm.description}
                onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                required
                rows="5"
                placeholder="Description"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base"
              />

              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm sm:text-base">
                {editingNewsId ? "💾 Update News/Event" : "➕ Add News/Event"}
              </button>

              {editingNewsId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingNewsId(null);
                    setNewsForm({ title: "", description: "", date: "", image: null, imagePreview: "" });
                  }}
                  className="w-full py-2 sm:py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300 text-sm sm:text-base"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="space-y-3 sm:space-y-4">
              {newsEvents.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-semibold text-base sm:text-lg block truncate">{item.title}</span>
                      <p className="text-blue-300 text-xs sm:text-sm">{formatDate(item.date)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <button onClick={() => handleEditNews(item)} className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-xs sm:text-sm">✏️ Edit</button>
                    <button onClick={() => handleDeleteNews(item.id)} className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-xs sm:text-sm">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === "careers" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <form onSubmit={handleCareerSubmit} className="space-y-3 sm:space-y-4 bg-slate-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {editingCareerId ? "✏️ Edit Career" : "➕ Add Career"}
              </h3>

              <input type="text" value={careerForm.title} onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })} required placeholder="Job Title" className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />
              <input type="text" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} required placeholder="Location" className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />
              <textarea value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} required rows="5" placeholder="Job Description" className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />

              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm sm:text-base">
                {editingCareerId ? "💾 Update Career" : "➕ Add Career"}
              </button>

              {editingCareerId && (
                <button type="button" onClick={() => { setEditingCareerId(null); setCareerForm({ title: "", description: "", location: "" }); }} className="w-full py-2 sm:py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300 text-sm sm:text-base">Cancel Edit</button>
              )}
            </form>

            <div className="space-y-3 sm:space-y-4">
              {careers.map((job) => (
                <div key={job.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-full sm:w-auto">
                    <span className="text-white font-semibold text-base sm:text-lg block">{job.title}</span>
                    <p className="text-blue-300 text-xs sm:text-sm">📍 {job.location}</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <button onClick={() => handleEditCareer(job)} className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-xs sm:text-sm">✏️ Edit</button>
                    <button onClick={() => handleDeleteCareer(job.id)} className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-xs sm:text-sm">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPLOYEES TAB */}
        {activeTab === "employees" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">

            {/* Add / Edit Employee Form */}
            <form onSubmit={handleEmployeeSubmit} className="space-y-3 sm:space-y-4 bg-slate-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {editingEmployeeId ? "✏️ Edit Employee" : "➕ Add Employee"}
              </h3>

              <input type="number" value={employeeForm.id} onChange={(e) => setEmployeeForm({ ...employeeForm, id: e.target.value })} required placeholder="Employee ID (Number)" disabled={editingEmployeeId !== null} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors disabled:opacity-50 text-sm sm:text-base" />
              <input type="text" value={employeeForm.name} onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} required placeholder="Full Name" className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />
              <input type="email" value={employeeForm.email} onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })} required placeholder="Email Address" className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />
              <input type="password" value={employeeForm.password} onChange={(e) => setEmployeeForm({ ...employeeForm, password: e.target.value })} required={!editingEmployeeId} placeholder={editingEmployeeId ? "Leave blank to keep current password" : "Password"} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base" />

              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm sm:text-base">
                {editingEmployeeId ? "💾 Update Employee" : "➕ Add Employee"}
              </button>

              {editingEmployeeId && (
                <button type="button" onClick={() => { setEditingEmployeeId(null); setEmployeeForm({ id: "", name: "", email: "", password: "" }); }} className="w-full py-2 sm:py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300 text-sm sm:text-base">Cancel Edit</button>
              )}
            </form>

            {/* Employees List - Mobile Optimized */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">👥 All Employees ({employees.length})</h3>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-cyan-300 font-semibold">ID</th>
                      <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-8 text-slate-400">No employees found. Add your first employee above.</td>
                      </tr>
                    ) : (
                      employees.map((employee) => (
                        <tr key={employee.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-4 text-blue-300 font-mono">{employee.id}</td>
                          <td className="py-3 px-4 text-white font-semibold">{employee.name}</td>
                          <td className="py-3 px-4 text-slate-300">{employee.email}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEditEmployee(employee)} className="px-3 py-1 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-sm">✏️ Edit</button>
                              <button onClick={() => handleDeleteEmployee(employee.id, employee.name)} className="px-2 py-1 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {employees.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">No employees found. Add your first employee above.</div>
                ) : (
                  employees.map((employee) => (
                    <div key={employee.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-blue-300 font-mono text-xs mb-1">ID: {employee.id}</div>
                          <div className="text-white font-semibold text-base truncate">{employee.name}</div>
                          <div className="text-slate-300 text-xs truncate">{employee.email}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditEmployee(employee)} className="flex-1 px-3 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-xs">✏️ Edit</button>
                        <button onClick={() => handleDeleteEmployee(employee.id, employee.name)} className="flex-1 px-3 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-xs">🗑️ Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Links Manager with Individual Edit - Mobile Optimized */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span>🔗</span> Manage Employee Quick Links
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
                Select an employee below to set their individual Google Sheets links. You can edit each link individually or save all at once.
              </p>

              {/* Employee Selector */}
              <div className="mb-4 sm:mb-6">
                <label className="text-blue-300 text-xs sm:text-sm font-semibold mb-2 block">Select Employee</label>
                <select
                  value={selectedEmployeeForLinks || ""}
                  onChange={(e) => handleSelectEmployeeForLinks(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <option value="">-- Choose an employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.id} – {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* URL Fields with Individual Edit Buttons */}
              {selectedEmployeeForLinks && linksConfig.length > 0 && (
                <>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {linksConfig.map((item) => (
                      <div key={item.key} className="bg-slate-700/50 p-3 sm:p-4 rounded-lg border border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-blue-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                            <span>{LINK_ICONS[item.key]}</span> 
                            <span className="truncate">{item.name}</span>
                          </label>
                          
                          {editingLinkKey === item.key ? (
                            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleSaveSingleLink(item.key)}
                                className="px-2 sm:px-3 py-1 bg-green-600/20 border border-green-500/40 text-green-300 rounded-lg hover:bg-green-600/30 transition-all duration-300 text-xs"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleCancelEditLink}
                                className="px-2 sm:px-3 py-1 bg-slate-600/20 border border-slate-500/40 text-slate-300 rounded-lg hover:bg-slate-600/30 transition-all duration-300 text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEditLink(item.key)}
                              className="px-2 sm:px-3 py-1 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-xs flex-shrink-0"
                            >
                              ✏️
                            </button>
                          )}
                        </div>
                        
                        {editingLinkKey === item.key ? (
                          <input
                            type="url"
                            value={editingLinkValue}
                            onChange={(e) => setEditingLinkValue(e.target.value)}
                            placeholder="https://docs.google.com/spreadsheets/..."
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 text-white rounded-lg border border-cyan-500 focus:border-cyan-400 focus:outline-none transition-colors text-xs sm:text-sm"
                            autoFocus
                          />
                        ) : (
                          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 text-slate-300 rounded-lg text-xs sm:text-sm break-all">
                            {linksForm[item.key] || <span className="text-slate-500 italic">No URL set</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bulk Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleSaveLinks}
                      className={`flex-1 py-2 sm:py-3 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base ${
                        linksSaved
                          ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                      }`}
                      disabled={linksSaved}
                    >
                      💾 Save All Links
                    </button>
                    <button
                      onClick={handleDeleteLinks}
                      className="sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 font-semibold text-sm sm:text-base"
                    >
                      🗑️ Delete All
                    </button>
                  </div>

                  {linksSaved && (
                    <p className="text-green-400 text-xs sm:text-sm mt-3 text-center">✓ All changes saved</p>
                  )}
                </>
              )}

              {!selectedEmployeeForLinks && (
                <div className="text-center py-6 text-slate-500 text-xs sm:text-sm">
                  Select an employee above to manage their links
                </div>
              )}
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB - Mobile Optimized */}
        {activeTab === "attendance" && (
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            {/* FILTER SECTION */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span>🔍</span> Filter Attendance
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {[
                  { key: 'today',        label: '📅 Today'        },
                  { key: 'week',         label: '📆 Week'    },
                  { key: 'month',        label: '📊 Month'   },
                  { key: 'custom-date',  label: '📌 Date'  },
                  { key: 'custom-week',  label: '📅 Week Range'  },
                  { key: 'custom-month', label: '📅 Month' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilterType(f.key)}
                    className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                      filterType === f.key
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {filterType === 'custom-date' && (
                  <div className="col-span-1">
                    <label className="text-blue-300 text-xs sm:text-sm mb-2 block">Select Date</label>
                    <input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" />
                  </div>
                )}

                {filterType === 'custom-week' && (
                  <>
                    <div>
                      <label className="text-blue-300 text-xs sm:text-sm mb-2 block">Week Start</label>
                      <input type="date" value={customWeekStart} onChange={(e) => setCustomWeekStart(e.target.value)} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" />
                    </div>
                    <div>
                      <label className="text-blue-300 text-xs sm:text-sm mb-2 block">Week End</label>
                      <input type="date" value={customWeekEnd} onChange={(e) => setCustomWeekEnd(e.target.value)} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" />
                    </div>
                  </>
                )}

                {filterType === 'custom-month' && (
                  <>
                    <div>
                      <label className="text-blue-300 text-xs sm:text-sm mb-2 block">Month</label>
                      <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm">
                        {months.map((month, index) => (
                          <option key={index} value={index + 1}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-blue-300 text-xs sm:text-sm mb-2 block">Year</label>
                      <input type="number" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" min="2020" max="2030" />
                    </div>
                  </>
                )}
              </div>

              {attendanceData && (
                <div className="mt-3 sm:mt-4 text-blue-200 text-xs sm:text-sm">
                  Showing: {attendanceData.date_range?.start} to {attendanceData.date_range?.end}
                </div>
              )}
            </div>

            {loadingAttendance ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-cyan-500"></div>
                <p className="text-blue-300 mt-4 text-sm sm:text-base">Loading attendance data...</p>
              </div>
            ) : attendanceData ? (
              <div className="space-y-4 sm:space-y-6">
                {attendanceData.attendance.map((empData) => (
                  <div key={empData.employee_id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 truncate">{empData.employee_name}</h3>
                        <p className="text-blue-300 text-xs sm:text-sm truncate">ID: {empData.employee_id} | {empData.email}</p>
                      </div>
                      <button onClick={() => handleDeleteEmployeeAttendance(empData.employee_id, empData.employee_name)} className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 font-semibold text-xs sm:text-sm whitespace-nowrap">🗑️ Delete All</button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg p-3 sm:p-4 border border-green-500/30">
                        <p className="text-green-300 text-[10px] sm:text-sm mb-1">Present</p>
                        <p className="text-xl sm:text-3xl font-bold text-white">{empData.summary.present_days}</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg p-3 sm:p-4 border border-cyan-500/30">
                        <p className="text-cyan-300 text-[10px] sm:text-sm mb-1">Hours</p>
                        <p className="text-xl sm:text-3xl font-bold text-white">{empData.summary.total_hours}h</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg p-3 sm:p-4 border border-purple-500/30">
                        <p className="text-purple-300 text-[10px] sm:text-sm mb-1">Days</p>
                        <p className="text-xl sm:text-3xl font-bold text-white">{empData.summary.total_days}</p>
                      </div>
                    </div>

                    {empData.records.length > 0 ? (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Date</th>
                                <th className="text-left py-3 px-4 text-cyan-300 font-semibold">In Time</th>
                                <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Out Time</th>
                                <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Hours</th>
                                <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {empData.records.map((record) => (
                                <tr key={record._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                  <td className="py-3 px-4 text-white font-mono text-sm">{formatDate(record.date)}</td>
                                  <td className="py-3 px-4 text-cyan-400 font-mono text-sm">{record.in_time_display}</td>
                                  <td className="py-3 px-4 text-blue-400 font-mono text-sm">{record.out_time_display}</td>
                                  <td className="py-3 px-4 text-purple-400 font-mono text-sm">{record.hours_worked}h</td>
                                  <td className="py-3 px-4">
                                    <button onClick={() => handleDeleteAttendanceRecord(record._id, empData.employee_name)} className="px-3 py-1 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm">🗑️</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-2">
                          {empData.records.map((record) => (
                            <div key={record._id} className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                              <div className="flex justify-between items-start mb-2">
                                <div className="text-white font-mono text-sm font-semibold">{formatDate(record.date)}</div>
                                <button onClick={() => handleDeleteAttendanceRecord(record._id, empData.employee_name)} className="px-2 py-1 bg-red-600/20 border border-red-500/40 text-red-300 rounded text-xs">🗑️</button>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <div className="text-cyan-400 mb-1">In</div>
                                  <div className="text-white font-mono">{record.in_time_display}</div>
                                </div>
                                <div>
                                  <div className="text-blue-400 mb-1">Out</div>
                                  <div className="text-white font-mono">{record.out_time_display}</div>
                                </div>
                                <div>
                                  <div className="text-purple-400 mb-1">Hours</div>
                                  <div className="text-white font-mono">{record.hours_worked}h</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-slate-400 text-sm">No attendance records for this period</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm sm:text-base">No attendance data available</div>
            )}
          </div>
        )}

        {/* ADMIN LINKS TAB - Mobile Optimized */}
        {activeTab === "admin-links" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Add / Edit Admin Link Form */}
            <form onSubmit={handleAdminLinkSubmit} className="space-y-3 sm:space-y-4 bg-slate-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {editingAdminLinkId ? "✏️ Edit Link" : "➕ Add New Link"}
              </h3>
              
              <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
                Add your own Excel sheets and documents with custom names and URLs for quick access.
              </p>

              <div>
                <label className="text-blue-300 text-xs sm:text-sm font-semibold mb-2 block">Link Name</label>
                <input
                  type="text"
                  value={adminLinkForm.name}
                  onChange={(e) => setAdminLinkForm({ ...adminLinkForm, name: e.target.value })}
                  required
                  placeholder="e.g., Monthly Budget Tracker"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="text-blue-300 text-xs sm:text-sm font-semibold mb-2 block">Sheet URL</label>
                <input
                  type="url"
                  value={adminLinkForm.url}
                  onChange={(e) => setAdminLinkForm({ ...adminLinkForm, url: e.target.value })}
                  required
                  placeholder="https://docs.google.com/spreadsheets/..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>

              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm sm:text-base">
                {editingAdminLinkId ? "💾 Update Link" : "➕ Add Link"}
              </button>

              {editingAdminLinkId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAdminLinkId(null);
                    setAdminLinkForm({ name: "", url: "" });
                  }}
                  className="w-full py-2 sm:py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300 text-sm sm:text-base"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            {/* Admin Links List - Mobile Optimized */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">📎 My Links ({adminLinks.length})</h3>

              {adminLinks.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-slate-400">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📋</div>
                  <p className="text-sm sm:text-base">No links added yet. Add your first link above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {adminLinks.map((link) => (
                    <div
                      key={link._id}
                      className="flex flex-col sm:flex-row justify-between items-start gap-3 bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                          <span className="text-xl sm:text-2xl">📊</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-base sm:text-lg mb-1 truncate">
                            {link.name}
                          </h4>
                          <p className="text-slate-400 text-xs sm:text-sm truncate">
                            {link.url}
                          </p>
                          {link.created_at && (
                            <p className="text-slate-500 text-[10px] sm:text-xs mt-1">
                              Added: {new Date(link.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                        <button
                          onClick={() => handleOpenAdminLink(link.url)}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
                          title="Open link"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="hidden sm:inline">Open</span>
                        </button>
                        
                        <button
                          onClick={() => handleEditAdminLink(link)}
                          className="px-3 sm:px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all duration-300 text-xs sm:text-sm"
                        >
                          ✏️
                        </button>
                        
                        <button
                          onClick={() => handleDeleteAdminLink(link._id, link.name)}
                          className="px-3 sm:px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-xs sm:text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
              <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <span>💡</span> Quick Tips
              </h4>
              <ul className="text-slate-300 text-xs sm:text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>You can add any type of link - Google Sheets, Excel Online, Google Docs, or other documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Give your links descriptive names so you can find them easily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Click "Open" to view the link in a new tab</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Links are sorted by creation date (newest first)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;