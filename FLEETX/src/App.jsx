
import { useState } from "react";
import "./App.css";

const initialOrders = [
  { id: "FX-2041", customer: "James Anderson", destination: "Lagos Island", driver: "Michael Johnson", date: "Nov 06, 2026", status: "In Transit", amount: "₦85,000" },
  { id: "FX-2042", customer: "Sarah Williams", destination: "Ikeja, Lagos", driver: "David Smith", date: "Nov 06, 2026", status: "Delivered", amount: "₦42,500" },
  { id: "FX-2043", customer: "Daniel Brown", destination: "Victoria Island", driver: "Alex Morgan", date: "Nov 05, 2026", status: "Pending", amount: "₦65,000" },
  { id: "FX-2044", customer: "Olivia Martin", destination: "Lekki Phase 1", driver: "Chris Evans", date: "Nov 05, 2026", status: "In Transit", amount: "₦95,000" },
  { id: "FX-2045", customer: "Noah Wilson", destination: "Surulere, Lagos", driver: "Robert James", date: "Nov 04, 2026", status: "Delivered", amount: "₦38,000" },
];

const menu = [
  { name: "Overview", icon: "▦" },
  { name: "Shipments", icon: "▣" },
  { name: "Fleet", icon: "🚚" },
  { name: "Drivers", icon: "♙" },
  { name: "Customers", icon: "♧" },
  { name: "Analytics", icon: "▥" },
];

function App() {
  const [active, setActive] = useState("Overview");
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [form, setForm] = useState({ customer: "", destination: "", amount: "" });

  const stats = [
    { label: "Total Shipments", value: "2,840", change: "+12.8%", icon: "▣", color: "blue" },
    { label: "Active Deliveries", value: "486", change: "+8.2%", icon: "🚚", color: "purple" },
    { label: "Total Customers", value: "1,240", change: "+18.4%", icon: "♙", color: "green" },
    { label: "Revenue", value: "₦8.42M", change: "+14.6%", icon: "₦", color: "orange" },
  ];

  const filteredOrders = orders.filter(order =>
    `${order.id} ${order.customer} ${order.destination}`
      .toLowerCase().includes(search.toLowerCase())
  );

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const addShipment = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `FX-${2050 + orders.length}`,
      customer: form.customer,
      destination: form.destination,
      driver: "Unassigned",
      date: "Nov 06, 2026",
      status: "Pending",
      amount: form.amount.startsWith("₦") ? form.amount : `₦${form.amount}`,
    };
    setOrders([newOrder, ...orders]);
    setForm({ customer: "", destination: "", amount: "" });
    setShowModal(false);
    setActive("Shipments");
    notify("New shipment created successfully!");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">F</div>
          <div>
            <h2>FLEET<span>X</span></h2>
            <small>LOGISTICS PLATFORM</small>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-icon">F</div>
          <div>
            <strong>Fleet Operations</strong>
            <small>Enterprise workspace</small>
          </div>
          <span>⌄</span>
        </div>

        <div className="nav-heading">MAIN MENU</div>
        <nav className="navigation">
          {menu.map(item => (
            <button
              key={item.name}
              className={`nav-item ${active === item.name ? "active" : ""}`}
              onClick={() => setActive(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {item.name === "Shipments" && <span className="nav-count">{orders.length}</span>}
            </button>
          ))}
        </nav>

        <div className="nav-heading management-heading">MANAGEMENT</div>
        <nav className="navigation">
          <button className={`nav-item ${active === "Reports" ? "active" : ""}`} onClick={() => setActive("Reports")}>
            <span className="nav-icon">▤</span> Reports
          </button>
          <button className={`nav-item ${active === "Settings" ? "active" : ""}`} onClick={() => setActive("Settings")}>
            <span className="nav-icon">⚙</span> Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">✦</div>
            <strong>Need assistance?</strong>
            <p>Our support team is ready to help you.</p>
            <button onClick={() => notify("Support team contact coming soon.")}>Contact support ↗</button>
          </div>
          <div className="profile">
            <div className="avatar">LA</div>
            <div className="profile-info">
              <strong>Lawal Admin</strong>
              <small>Administrator</small>
            </div>
            <button onClick={() => setActive("Settings")}>•••</button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div>
          <div className="top-actions">
            <div className="system-status"><span></span> All systems operational</div>
            <button className="icon-button" onClick={() => notify("You're all caught up!")}>♧</button>
            <div className="top-avatar">LA</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="date-label">FRIDAY, NOVEMBER 06, 2026</div>
              <h1>{active === "Overview" ? "Welcome back, Lawal 👋" : active}</h1>
              <p>{active === "Overview" ? "Here's what's happening with your logistics operations today." : `Manage and monitor your ${active.toLowerCase()} operations.`}</p>
            </div>
            <button className="primary-button" onClick={() => setShowModal(true)}>
              <span>＋</span> Create shipment
            </button>
          </section>

          {active === "Overview" && (
            <>
              <section className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat-card" key={stat.label}>
                    <div className="stat-top">
                      <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                      <span className="growth">↗ {stat.change}</span>
                    </div>
                    <p>{stat.label}</p>
                    <h2>{stat.value}</h2>
                    <small>Compared to last month</small>
                  </div>
                ))}
              </section>

              <section className="middle-grid">
                <div className="panel performance-panel">
                  <div className="panel-heading">
                    <div><h3>Delivery performance</h3><p>Shipment activity over the last 7 days</p></div>
                    <select aria-label="Performance period"><option>Last 7 days</option><option>Last 30 days</option></select>
                  </div>
                  <div className="chart-summary">
                    <div><strong>1,842</strong><small>Total deliveries</small></div>
                    <div className="chart-legend"><span></span> Delivered <span className="legend-purple"></span> In transit</div>
                  </div>
                  <div className="chart">
                    <div className="chart-y-labels"><span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div>
                    <div className="chart-area">
                      {[["Mon", 44, 24], ["Tue", 64, 32], ["Wed", 50, 22], ["Thu", 82, 35], ["Fri", 70, 30], ["Sat", 91, 44], ["Sun", 62, 25]].map(([day, first, second]) => (
                        <div className="chart-column" key={day}>
                          <div className="bar-stack">
                            <div className="bar-blue" style={{ height: `${first}%` }}></div>
                            <div className="bar-purple" style={{ height: `${second}%` }}></div>
                          </div>
                          <small>{day}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="panel delivery-panel">
                  <div className="panel-heading"><div><h3>Delivery overview</h3><p>Current shipment status</p></div><button className="more-button" onClick={() => setActive("Shipments")}>•••</button></div>
                  <div className="donut-wrap"><div className="donut"><div><strong>2,840</strong><small>Total orders</small></div></div></div>
                  <div className="delivery-legend">
                    <div><span className="dot delivered"></span> Delivered <strong>1,820</strong></div>
                    <div><span className="dot transit"></span> In transit <strong>720</strong></div>
                    <div><span className="dot pending"></span> Pending <strong>300</strong></div>
                  </div>
                </div>
              </section>

              <section className="panel orders-panel">
                <div className="panel-heading orders-heading">
                  <div><h3>Recent shipments</h3><p>Keep track of your latest delivery activities</p></div>
                  <button className="view-all" onClick={() => setActive("Shipments")}>View all shipments →</button>
                </div>
                <OrderTable orders={orders.slice(0, 5)} />
              </section>
            </>
          )}

          {active === "Shipments" && (
            <section className="panel orders-panel full-panel">
              <div className="panel-heading orders-heading">
                <div><h3>All shipments</h3><p>Manage your delivery orders</p></div>
                <input className="search-input" placeholder="Search shipments..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <OrderTable orders={filteredOrders} />
            </section>
          )}

          {active === "Fleet" && <ManagementPanel title="Fleet management" description="Monitor and manage your delivery vehicles." items={[["🚚","Mercedes-Benz Sprinter","LAG-204-FX","Active"],["🚛","Toyota Hiace","LAG-882-KL","On delivery"],["🚐","Ford Transit","LAG-310-AB","Available"]]} />}
          {active === "Drivers" && <ManagementPanel title="Driver directory" description="Manage your delivery personnel." items={[["👤","Michael Johnson","DRV-001","Active"],["👤","David Smith","DRV-002","Active"],["👤","Alex Morgan","DRV-003","Available"]]} />}
          {active === "Customers" && <ManagementPanel title="Customer directory" description="Your registered customers." items={[["👤","James Anderson","james@example.com","Active"],["👤","Sarah Williams","sarah@example.com","Active"],["👤","Daniel Brown","daniel@example.com","Active"]]} />}
          {(active === "Analytics" || active === "Reports") && <div className="panel placeholder-panel"><div className="stat-icon blue">▥</div><h2>{active}</h2><p>Performance reports and detailed business insights will appear here.</p></div>}
          {active === "Settings" && <div className="panel placeholder-panel"><div className="stat-icon blue">⚙</div><h2>Workspace settings</h2><p>Manage your FLEETX workspace and account preferences.</p><button className="primary-button" onClick={() => notify("Settings saved!")}>Save settings</button></div>}
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form className="shipment-modal" onClick={e => e.stopPropagation()} onSubmit={addShipment}>
            <div className="modal-heading"><div><h2>Create shipment</h2><p>Add a new delivery order to your operations.</p></div><button type="button" onClick={() => setShowModal(false)}>✕</button></div>
            <label>Customer name<input required value={form.customer} onChange={e => setForm({...form, customer:e.target.value})} placeholder="Enter customer name" /></label>
            <label>Delivery destination<input required value={form.destination} onChange={e => setForm({...form, destination:e.target.value})} placeholder="Enter delivery address" /></label>
            <label>Delivery amount<input required type="number" min="1" value={form.amount} onChange={e => setForm({...form, amount:e.target.value})} placeholder="e.g. 45000" /></label>
            <button className="primary-button submit-button" type="submit">Create shipment →</button>
          </form>
        </div>
      )}
      {notification && <div className="toast">✓ {notification}</div>}
    </div>
  );
}

function OrderTable({ orders }) {
  return (
    <div className="table-scroll">
      <table className="orders-table">
        <thead><tr><th>SHIPMENT ID</th><th>CUSTOMER</th><th>DESTINATION</th><th>DRIVER</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th></tr></thead>
        <tbody>
          {orders.map(order => <tr key={order.id}>
            <td className="order-id">{order.id}</td><td>{order.customer}</td><td>{order.destination}</td><td>{order.driver}</td><td>{order.date}</td>
            <td><span className={`status ${order.status.toLowerCase().replace(" ","-")}`}>{order.status}</span></td><td className="amount">{order.amount}</td>
          </tr>)}
          {orders.length === 0 && <tr><td colSpan="7" className="empty-row">No shipments found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ManagementPanel({ title, description, items }) {
  return (
    <section className="panel orders-panel full-panel">
      <div className="panel-heading"><div><h3>{title}</h3><p>{description}</p></div></div>
      {items.map((item, i) => <div className="management-row" key={i}><span className="management-icon">{item[0]}</span><div><strong>{item[1]}</strong><small>{item[2]}</small></div><span className="status delivered">{item[3]}</span></div>)}
    </section>
  );
}

export default App;
