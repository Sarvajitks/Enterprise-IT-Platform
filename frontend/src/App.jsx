import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tickets";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const value = search.toLowerCase();

    return (
      ticket.title?.toLowerCase().includes(value) ||
      ticket.description?.toLowerCase().includes(value) ||
      ticket.category?.toLowerCase().includes(value)
    );
  });

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const criticalTickets = tickets.filter(
    (ticket) => ticket.priority === "Critical"
  ).length;

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">IT</div>

          <div>
            <h2>Enterprise</h2>
            <span>IT Platform</span>
          </div>
        </div>

        <nav className="navigation">

          <div className="nav-section">
            MAIN
          </div>

          <a className="nav-item active">
            <span>▦</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>▤</span>
            Tickets
          </a>

          <a className="nav-item">
            <span>◉</span>
            Employees
          </a>

          <div className="nav-section">
            MANAGEMENT
          </div>

          <a className="nav-item">
            <span>◫</span>
            Analytics
          </a>

          <a className="nav-item">
            <span>⚙</span>
            Settings
          </a>

        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>

            <div>
              <strong>System Online</strong>
              <small>All services operational</small>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <p className="breadcrumb">Enterprise / Dashboard</p>
            <h1>IT Service Dashboard</h1>
          </div>

          <div className="top-actions">

            <button
              className="refresh-button"
              onClick={fetchTickets}
            >
              ↻ Refresh
            </button>

            <button className="new-ticket-button">
              + New Ticket
            </button>

            <div className="profile">
              <div className="avatar">A</div>

              <div>
                <strong>Admin</strong>
                <small>IT Administrator</small>
              </div>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <section className="content">

          {/* STAT CARDS */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">▦</div>

              <div>
                <span>Total Tickets</span>
                <strong>{totalTickets}</strong>
              </div>

              <small className="stat-info">
                All submitted tickets
              </small>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">◷</div>

              <div>
                <span>Open Tickets</span>
                <strong>{openTickets}</strong>
              </div>

              <small className="stat-info">
                Waiting for action
              </small>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">↻</div>

              <div>
                <span>In Progress</span>
                <strong>{progressTickets}</strong>
              </div>

              <small className="stat-info">
                Currently being handled
              </small>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">!</div>

              <div>
                <span>Critical</span>
                <strong>{criticalTickets}</strong>
              </div>

              <small className="stat-info">
                Requires immediate action
              </small>
            </div>

          </div>

          {/* TICKET SECTION */}
          <section className="ticket-section">

            <div className="ticket-header">

              <div>
                <h2>Recent IT Tickets</h2>
                <p>Monitor and manage employee support requests</p>
              </div>

              <div className="ticket-tools">

                <div className="search-box">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

              </div>

            </div>

            {loading ? (
              <div className="empty-state">
                Loading tickets...
              </div>
            ) : filteredTickets.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">✓</div>

                <h3>No tickets found</h3>

                <p>
                  There are currently no tickets matching your search.
                </p>

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Ticket</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredTickets.map((ticket) => (

                      <tr key={ticket._id}>

                        <td>

                          <div className="ticket-title">

                            <div className="ticket-avatar">
                              {ticket.title?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <strong>{ticket.title}</strong>

                              <small>
                                #{ticket._id?.slice(-6)}
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>
                          <span className="category">
                            {ticket.category}
                          </span>
                        </td>

                        <td>

                          <span
                            className={`priority ${ticket.priority
                              ?.toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {ticket.priority}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`status ${ticket.status
                              ?.toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            <span></span>
                            {ticket.status}
                          </span>

                        </td>

                        <td>

                          <span className="date">
                            {ticket.createdAt
                              ? new Date(
                                  ticket.createdAt
                                ).toLocaleDateString()
                              : "-"}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </section>

      </main>

    </div>
  );
}

export default App;