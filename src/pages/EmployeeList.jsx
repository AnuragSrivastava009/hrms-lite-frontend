// import { useEffect, useState } from "react";
// import { api } from "../api";

// export default function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     employee_id: "",
//     full_name: "",
//     email: "",
//     department: ""
//   });

//   const loadEmployees = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/employees/");
//       console.log("res:::",res);
      
//       setEmployees(res.data);
//     } catch (e) {
//       setError("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   const submit = async () => {
//     try {
//       setError("");
//       await api.post("/employees/", form);
//       setForm({ employee_id: "", full_name: "", email: "", department: "" });
//       loadEmployees();
//     } catch (e) {
//       setError(e.response?.data?.detail || "Create failed");
//     }
//   };

//   const remove = async (id) => {
//     await api.delete(`/employees/${id}`);
//     loadEmployees();
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Employees</h2>

//       <div style={{ display: "grid", gap: 8, maxWidth: 400 }}>
//         <input placeholder="Employee ID" value={form.employee_id}
//           onChange={e => setForm({ ...form, employee_id: e.target.value })} />
//         <input placeholder="Full Name" value={form.full_name}
//           onChange={e => setForm({ ...form, full_name: e.target.value })} />
//         <input placeholder="Email" value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })} />
//         <input placeholder="Department" value={form.department}
//           onChange={e => setForm({ ...form, department: e.target.value })} />
//         <button onClick={submit}>Add Employee</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!loading && employees.length === 0 && <p>No employees yet</p>}

//       <ul>
//         {employees.map(e => (
//           <li key={e.id}>
//             {e.full_name} ({e.department})
//             <button onClick={() => remove(e.id)} style={{ marginLeft: 12 }}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { api } from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --bg: #0c0f0a;
    --surface: #141810;
    --surface2: #1c2118;
    --border: #2a3326;
    --accent: #a8ff78;
    --accent2: #78ffd6;
    --muted: #5a6b54;
    --text: #e8f0e4;
    --text2: #8fa688;
    --danger: #ff6b6b;
    --danger-bg: rgba(255, 107, 107, 0.08);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .emp-root {
    font-family: 'DM Mono', monospace;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
    padding: 40px 32px;
  }

  .emp-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 48px;
  }

  .emp-header-badge {
    background: var(--accent2);
    color: #0c0f0a;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    margin-top: 6px;
  }

  .emp-header-content h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 36px;
    line-height: 1;
    letter-spacing: -1px;
    color: var(--text);
  }

  .emp-header-content p {
    color: var(--text2);
    font-size: 13px;
    margin-top: 6px;
    letter-spacing: 0.5px;
  }

  .emp-layout {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .emp-layout { grid-template-columns: 1fr; }
  }

  .emp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
  }

  .emp-card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text2);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .emp-card-title::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--accent2);
    border-radius: 50%;
  }

  .emp-field {
    margin-bottom: 14px;
  }

  .emp-label {
    display: block;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 7px;
  }

  .emp-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .emp-input::placeholder {
    color: var(--muted);
  }

  .emp-input:focus {
    border-color: var(--accent2);
    box-shadow: 0 0 0 3px rgba(120, 255, 214, 0.1);
  }

  .emp-submit {
    width: 100%;
    padding: 14px;
    background: var(--accent);
    color: #0c0f0a;
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .emp-submit:hover {
    background: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(168, 255, 120, 0.2);
  }

  .emp-submit:active {
    transform: translateY(0);
  }

  .emp-error {
    background: var(--danger-bg);
    border: 1px solid rgba(255, 107, 107, 0.25);
    border-radius: 8px;
    color: var(--danger);
    font-size: 12px;
    padding: 10px 14px;
    margin-top: 12px;
    letter-spacing: 0.3px;
  }

  /* Right Panel */
  .emp-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .emp-count-badge {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--text2);
  }

  .emp-search-wrap {
    position: relative;
    margin-bottom: 16px;
  }

  .emp-search-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    font-size: 13px;
    pointer-events: none;
  }

  .emp-search {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 10px 14px 10px 36px;
    outline: none;
    transition: border-color 0.2s;
  }

  .emp-search::placeholder { color: var(--muted); }
  .emp-search:focus { border-color: var(--accent2); }

  .emp-table-head {
    display: grid;
    grid-template-columns: 100px 1fr 1fr 80px 44px;
    gap: 8px;
    padding: 8px 14px;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    margin-bottom: 8px;
  }

  .emp-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 520px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .emp-list::-webkit-scrollbar { width: 4px; }
  .emp-list::-webkit-scrollbar-track { background: var(--surface2); border-radius: 4px; }
  .emp-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .emp-row {
    display: grid;
    grid-template-columns: 100px 1fr 1fr 80px 44px;
    gap: 8px;
    align-items: center;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 13px 14px;
    transition: border-color 0.2s, transform 0.15s;
    animation: rowIn 0.3s ease;
  }

  @keyframes rowIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .emp-row:hover {
    border-color: var(--muted);
  }

  .emp-row-id {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .emp-row-name {
    font-size: 13px;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .emp-row-email {
    font-size: 12px;
    color: var(--text2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .emp-dept-tag {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(120, 255, 214, 0.08);
    border: 1px solid rgba(120, 255, 214, 0.15);
    color: var(--accent2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .emp-delete {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    color: var(--muted);
    cursor: pointer;
    font-size: 15px;
    padding: 5px 8px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
  }

  .emp-delete:hover {
    background: var(--danger-bg);
    border-color: rgba(255, 107, 107, 0.25);
    color: var(--danger);
  }

  .emp-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }

  .emp-empty-icon {
    font-size: 40px;
    opacity: 0.3;
    margin-bottom: 14px;
  }

  .emp-empty p {
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  .emp-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    gap: 10px;
    color: var(--muted);
    font-size: 13px;
  }

  .emp-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .emp-toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--surface);
    border: 1px solid var(--accent);
    border-radius: 8px;
    padding: 14px 20px;
    font-size: 13px;
    color: var(--accent);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease;
    z-index: 1000;
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FIELD_CONFIG = [
  { key: "employee_id", label: "Employee ID",  placeholder: "e.g. EMP-001" },
  { key: "full_name",   label: "Full Name",     placeholder: "Jane Doe" },
  { key: "email",       label: "Email",         placeholder: "jane@company.com" },
  { key: "department",  label: "Department",    placeholder: "Engineering" },
];

const EMPTY_FORM = { employee_id: "", full_name: "", email: "", department: "" };

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm]           = useState(EMPTY_FORM);
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);
  const [deleting, setDeleting]   = useState(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees/");
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEmployees(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const submit = async () => {
    if (!form.employee_id || !form.full_name) {
      setError("Employee ID and Full Name are required");
      return;
    }
    try {
      setError("");
      await api.post("/employees/", form);
      setForm(EMPTY_FORM);
      await loadEmployees();
      showToast(`${form.full_name} added successfully`);
    } catch (e) {
      setError(e.response?.data?.detail || "Create failed");
    }
  };

  const remove = async (id, name) => {
    setDeleting(id);
    try {
      await api.delete(`/employees/${id}`);
      await loadEmployees();
      showToast(`${name} removed`);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = employees.filter(e =>
    !search ||
    e.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.employee_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{styles}</style>
      <div className="emp-root">

        <div className="emp-header">
          <div className="emp-header-badge">Team</div>
          <div className="emp-header-content">
            <h1>Employees</h1>
            <p>Manage your team members and departments</p>
          </div>
        </div>

        <div className="emp-layout">

          {/* Left: Add Form */}
          <div className="emp-card">
            <div className="emp-card-title">New Employee</div>

            {FIELD_CONFIG.map(({ key, label, placeholder }) => (
              <div className="emp-field" key={key}>
                <label className="emp-label">{label}</label>
                <input
                  className="emp-input"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && submit()}
                />
              </div>
            ))}

            <button className="emp-submit" onClick={submit}>
              + Add Employee
            </button>

            {error && <div className="emp-error">⚠ {error}</div>}
          </div>

          {/* Right: Employee Table */}
          <div className="emp-card">
            <div className="emp-top-row">
              <div className="emp-card-title" style={{ marginBottom: 0 }}>Directory</div>
              <span className="emp-count-badge">{employees.length} members</span>
            </div>

            <div className="emp-search-wrap">
              <span className="emp-search-icon">⌕</span>
              <input
                className="emp-search"
                placeholder="Search by name, department, email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="emp-loading">
                <div className="emp-spinner" />
                Loading employees...
              </div>
            ) : filtered.length === 0 ? (
              <div className="emp-empty">
                <div className="emp-empty-icon">◌</div>
                <p>{search ? "No results match your search" : "No employees yet — add one!"}</p>
              </div>
            ) : (
              <>
                <div className="emp-table-head">
                  <span>ID</span>
                  <span>Name</span>
                  <span>Email</span>
                  <span>Dept</span>
                  <span></span>
                </div>
                <div className="emp-list">
                  {filtered.map(e => (
                    <div className="emp-row" key={e.id}>
                      <span className="emp-row-id">{e.employee_id || "—"}</span>
                      <span className="emp-row-name">{e.full_name}</span>
                      <span className="emp-row-email">{e.email || "—"}</span>
                      <span className="emp-dept-tag">{e.department || "—"}</span>
                      <button
                        className="emp-delete"
                        title="Remove employee"
                        disabled={deleting === e.id}
                        onClick={() => remove(e.id, e.full_name)}
                      >
                        {deleting === e.id ? "…" : "✕"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {toast && <div className="emp-toast">✓ {toast}</div>}
    </>
  );
}