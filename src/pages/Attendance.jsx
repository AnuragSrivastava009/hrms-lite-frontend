
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
    --present: #a8ff78;
    --absent: #ff6b6b;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .att-root {
    font-family: 'DM Mono', monospace;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
    padding: 40px 32px;
  }

  .att-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 48px;
  }

  .att-header-badge {
    background: var(--accent);
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

  .att-header-content h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 36px;
    line-height: 1;
    letter-spacing: -1px;
    color: var(--text);
  }

  .att-header-content p {
    color: var(--text2);
    font-size: 13px;
    margin-top: 6px;
    letter-spacing: 0.5px;
  }

  .att-grid {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .att-grid { grid-template-columns: 1fr; }
  }

  .att-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
  }

  .att-card-title {
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

  .att-card-title::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
  }

  .att-field {
    margin-bottom: 16px;
  }

  .att-label {
    display: block;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .att-select, .att-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 12px 14px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }

  .att-select-wrapper {
    position: relative;
  }

  .att-select-wrapper::after {
    content: '▾';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 12px;
  }

  .att-select:focus, .att-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(168, 255, 120, 0.1);
  }

  .att-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.7);
    cursor: pointer;
  }

  .att-status-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }

  .att-status-btn {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px;
    background: var(--surface2);
    color: var(--text2);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .att-status-btn.active-present {
    border-color: var(--present);
    background: rgba(168, 255, 120, 0.08);
    color: var(--present);
    box-shadow: 0 0 0 1px var(--present);
  }

  .att-status-btn.active-absent {
    border-color: var(--absent);
    background: rgba(255, 107, 107, 0.08);
    color: var(--absent);
    box-shadow: 0 0 0 1px var(--absent);
  }

  .att-submit {
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .att-submit:hover:not(:disabled) {
    background: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(168, 255, 120, 0.2);
  }

  .att-submit:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .att-submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .att-records-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .att-count {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--text2);
  }

  .att-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }

  .att-empty-icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.4;
  }

  .att-empty p {
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  .att-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .att-list::-webkit-scrollbar {
    width: 4px;
  }
  .att-list::-webkit-scrollbar-track {
    background: var(--surface2);
    border-radius: 4px;
  }
  .att-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }

  .att-record {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    transition: border-color 0.2s;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .att-record:hover {
    border-color: var(--muted);
  }

  .att-record-date {
    font-size: 13px;
    color: var(--text);
    letter-spacing: 0.5px;
  }

  .att-record-day {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .att-badge {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .att-badge.present {
    background: rgba(168, 255, 120, 0.1);
    color: var(--present);
    border: 1px solid rgba(168, 255, 120, 0.2);
  }

  .att-badge.absent {
    background: rgba(255, 107, 107, 0.1);
    color: var(--absent);
    border: 1px solid rgba(255, 107, 107, 0.2);
  }

  .att-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  .att-stat {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px;
    text-align: center;
  }

  .att-stat-num {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: var(--text);
    line-height: 1;
  }

  .att-stat-num.green { color: var(--present); }
  .att-stat-num.red { color: var(--absent); }

  .att-stat-label {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }

  .att-toast {
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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.get("/employees").then(res => setEmployees(res.data));
  }, []);

  const loadRecords = async (id) => {
    const res = await api.get(`/attendance/${id}`);
    setRecords(res.data);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const mark = async () => {
    if (!selected || !date) return;
    setLoading(true);
    try {
      await api.post("/attendance/", { employee_id: selected, date, status });
      await loadRecords(selected);
      showToast(`Marked ${status} for ${date}`);
    } catch (e) {
      showToast("Error saving record");
    } finally {
      setLoading(false);
    }
  };

  const presentCount = records.filter(r => r.status === "Present").length;
  const absentCount = records.filter(r => r.status === "Absent").length;
  const rate = records.length ? Math.round((presentCount / records.length) * 100) : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="att-root">
        <div className="att-header">
          <div className="att-header-badge">HR</div>
          <div className="att-header-content">
            <h1>Attendance</h1>
            <p>Track and manage employee attendance records</p>
          </div>
        </div>

        <div className="att-grid">
          {/* Left: Form */}
          <div className="att-card">
            <div className="att-card-title">Mark Attendance</div>

            <div className="att-field">
              <label className="att-label">Employee</label>
              <div className="att-select-wrapper">
                <select
                  className="att-select"
                  value={selected}
                  onChange={e => {
                    setSelected(e.target.value);
                    if (e.target.value) loadRecords(e.target.value);
                    else setRecords([]);
                  }}
                >
                  <option value="">Select employee...</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.full_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="att-field">
              <label className="att-label">Date</label>
              <input
                type="date"
                className="att-input"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>

            <div className="att-field">
              <label className="att-label">Status</label>
              <div className="att-status-row">
                <button
                  className={`att-status-btn ${status === "Present" ? "active-present" : ""}`}
                  onClick={() => setStatus("Present")}
                >
                  ✓ Present
                </button>
                <button
                  className={`att-status-btn ${status === "Absent" ? "active-absent" : ""}`}
                  onClick={() => setStatus("Absent")}
                >
                  ✗ Absent
                </button>
              </div>
            </div>

            <button
              className="att-submit"
              onClick={mark}
              disabled={!selected || !date || loading}
            >
              {loading ? "Saving..." : "↵ Mark Attendance"}
            </button>
          </div>

          {/* Right: Records */}
          <div className="att-card">
            <div className="att-records-header">
              <div className="att-card-title" style={{ marginBottom: 0 }}>Records</div>
              {records.length > 0 && (
                <span className="att-count">{records.length} entries</span>
              )}
            </div>

            {selected && records.length > 0 && (
              <div className="att-stats">
                <div className="att-stat">
                  <div className="att-stat-num green">{presentCount}</div>
                  <div className="att-stat-label">Present</div>
                </div>
                <div className="att-stat">
                  <div className="att-stat-num red">{absentCount}</div>
                  <div className="att-stat-label">Absent</div>
                </div>
                <div className="att-stat">
                  <div className="att-stat-num" style={{ color: rate >= 80 ? 'var(--present)' : rate >= 60 ? '#ffd166' : 'var(--absent)' }}>
                    {rate}%
                  </div>
                  <div className="att-stat-label">Rate</div>
                </div>
              </div>
            )}

            {!selected || records.length === 0 ? (
              <div className="att-empty">
                <div className="att-empty-icon">◌</div>
                <p>{!selected ? "Select an employee to view records" : "No attendance records found"}</p>
              </div>
            ) : (
              <div className="att-list">
                {records.map(r => (
                  <div className="att-record" key={r.id}>
                    <div>
                      <div className="att-record-date">{r.date}</div>
                      <div className="att-record-day">{formatDate(r.date)}</div>
                    </div>
                    <span className={`att-badge ${r.status.toLowerCase()}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="att-toast">✓ {toast}</div>}
    </>
  );
}
