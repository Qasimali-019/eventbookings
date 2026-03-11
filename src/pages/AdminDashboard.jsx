import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import './Dashboard.css';
import { 
  Users, Calendar, ShoppingCart, DollarSign, Plus, 
  Settings, AlertTriangle, Trash2, Zap, BarChart3, Clock 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar 
} from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock Data States
  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Global Tech Summit 2026', organizer: 'Sarah Connor', date: 'Oct 12, 2026' },
    { id: 2, name: 'Indie Rock Festival', organizer: 'Live Nation', date: 'Oct 14, 2026' }
  ]);
  
  const [events, setEvents] = useState([
    { id: 101, title: 'Marketing Workshop', status: 'Published', tickets: 150 },
    { id: 102, title: 'Annual Gala', status: 'Draft', tickets: 0 }
  ]);

  const [automationRules, setAutomationRules] = useState([
    { id: 1, trigger: '24 hours before event', action: 'Send Reminder Email to Attendees', status: 'Active' },
    { id: 2, trigger: 'Capacity reaches 90%', action: 'Alert Organizer via SMS', status: 'Active' },
    { id: 3, trigger: 'Event Completed', action: 'Send Feedback Survey', status: 'Draft' }
  ]);

  const [attendees, setAttendees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', event: 'Global Tech Summit 2026', checkedIn: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', event: 'Global Tech Summit 2026', checkedIn: true },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', event: 'Marketing Workshop 2026', checkedIn: false },
  ]);

  // Chart Data
  const registrationTends = [
    { name: 'Mon', count: 400 }, { name: 'Tue', count: 300 }, { name: 'Wed', count: 550 },
    { name: 'Thu', count: 200 }, { name: 'Fri', count: 278 }, { name: 'Sat', count: 189 }, { name: 'Sun', count: 239 }
  ];
  
  const revenueData = [
    { name: 'Week 1', revenue: 4000 }, { name: 'Week 2', revenue: 3000 }, { name: 'Week 3', revenue: 2000 },
    { name: 'Week 4', revenue: 2780 }
  ];

  // Handlers
  const handleApprove = (id) => {
    setApprovals(approvals.filter(app => app.id !== id));
    const approvedEvent = approvals.find(app => app.id === id);
    if(approvedEvent) {
       setEvents([...events, { id: Math.random(), title: approvedEvent.name, status: 'Published', tickets: 0 }]);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const toggleCheckIn = (id) => {
    setAttendees(attendees.map(a => a.id === id ? { ...a, checkedIn: !a.checkedIn } : a));
  };

  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ triggerType: 'Time-based', trigger: '', action: 'Send Email to Attendees' });

  const handleCreateRule = (e) => {
    e.preventDefault();
    setAutomationRules([...automationRules, {
      id: Date.now(),
      trigger: newRule.trigger,
      action: newRule.action,
      status: 'Active'
    }]);
    setIsRuleModalOpen(false);
    setNewRule({ triggerType: 'Time-based', trigger: '', action: 'Send Email to Attendees' });
  };

  const stats = [
    { title: 'Total Events', value: events.length + 1246, icon: Calendar, color: '#5D5CDE', bgColor: '#EBF1FF' },
    { title: 'Total Users', value: '45.2K', icon: Users, color: '#10B981', bgColor: '#D1FAE5' },
    { title: 'Bookings', value: '128.5K', icon: ShoppingCart, color: '#F59E0B', bgColor: '#FEF3C7' },
    { title: 'Revenue', value: '$1.4M', icon: DollarSign, color: '#EC4899', bgColor: '#FCE7F3' },
  ];

  // Views
  const renderDashboard = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: stat.bgColor, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <stat.icon color={stat.color} size={24} />
            </div>
            <div>
              <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{stat.title}</p>
              <h3 style={{ color: '#0F172A', fontSize: '24px', fontWeight: '800' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700' }}>Pending Approval ({approvals.length})</h2>
            <button onClick={() => setActiveTab('approvals')} style={{ color: '#5D5CDE', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View All</button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B', fontSize: '14px' }}>
                <th style={{ padding: '12px 0', fontWeight: '500' }}>Event Name</th>
                <th style={{ padding: '12px 0', fontWeight: '500' }}>Organizer</th>
                <th style={{ padding: '12px 0', fontWeight: '500', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvals.length === 0 ? (
                <tr><td colSpan="3" style={{ padding: '20px 0', textAlign: 'center', color: '#94A3B8' }}>No pending approvals.</td></tr>
              ) : (
                approvals.slice(0, 3).map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '16px 0', color: '#0F172A', fontWeight: '600' }}>{app.name}</td>
                    <td style={{ padding: '16px 0', color: '#4A5568' }}>{app.organizer}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                      <button onClick={() => handleApprove(app.id)} style={{ border: 'none', background: '#10B981', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Approve</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', marginBottom: '20px' }}>System Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { time: '10 min ago', action: 'New user registered', desc: 'mike@example.com' },
              { time: '1 hour ago', action: 'Event Published', desc: 'Marketing Workshop 2026' },
              { time: '3 hours ago', action: 'Payment Processed', desc: '150 tickets sold for Concert' },
              { time: '5 hours ago', action: 'System Update', desc: 'Server maintenance completed' },
            ].map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#5D5CDE', marginTop: '6px' }}></div>
                <div>
                  <p style={{ color: '#0F172A', fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{log.action}</p>
                  <p style={{ color: '#64748B', fontSize: '13px' }}>{log.desc}</p>
                  <p style={{ color: '#94A3B8', fontSize: '12px', marginTop: '4px' }}>{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Main Chart */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', marginBottom: '8px' }}>Registration Trends</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Ticket sales across all active platforms (Last 7 Days)</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5D5CDE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#5D5CDE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="count" stroke="#5D5CDE" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Chart */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', marginBottom: '8px' }}>Revenue (MTD)</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Gross volume processed</p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#F59E0B" /> Rule Engine
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>Configure automated workflows for all your events.</p>
        </div>
        <button 
          onClick={() => setIsRuleModalOpen(true)}
          style={{ backgroundColor: '#5D5CDE', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> New Rule
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left', color: '#64748B', fontSize: '14px' }}>
            <th style={{ padding: '16px 0', fontWeight: '500' }}>Trigger Event</th>
            <th style={{ padding: '16px 0', fontWeight: '500' }}>Automated Action</th>
            <th style={{ padding: '16px 0', fontWeight: '500' }}>Status</th>
            <th style={{ padding: '16px 0', fontWeight: '500', textAlign: 'right' }}>Controls</th>
          </tr>
        </thead>
        <tbody>
          {automationRules.map(rule => (
            <tr key={rule.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '20px 0', color: '#0F172A', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#475569" /> {rule.trigger}
              </td>
              <td style={{ padding: '20px 0', color: '#4A5568' }}>{rule.action}</td>
              <td style={{ padding: '20px 0' }}>
                <span style={{ 
                  backgroundColor: rule.status === 'Active' ? '#D1FAE5' : '#F1F5F9', 
                  color: rule.status === 'Active' ? '#065F46' : '#64748B', 
                  padding: '4px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '700' 
                }}>
                  {rule.status}
                </span>
              </td>
              <td style={{ padding: '20px 0', textAlign: 'right' }}>
                <button style={{ border: 'none', background: 'transparent', color: '#5D5CDE', fontWeight: '600', cursor: 'pointer', marginRight: '16px' }}>Edit</button>
                <button style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEvents = () => (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', marginBottom: '20px' }}>All Events ({events.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B', fontSize: '14px' }}>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Event ID</th>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Title</th>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Status</th>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Tickets Sold</th>
            <th style={{ padding: '12px 0', fontWeight: '500', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '16px 0', color: '#64748B' }}>#{Math.floor(ev.id)}</td>
              <td style={{ padding: '16px 0', color: '#0F172A', fontWeight: '600' }}>{ev.title}</td>
              <td style={{ padding: '16px 0' }}>
                <span style={{ backgroundColor: ev.status === 'Published' ? '#D1FAE5' : '#FEF3C7', color: ev.status === 'Published' ? '#065F46' : '#92400E', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{ev.status}</span>
              </td>
              <td style={{ padding: '16px 0', color: '#4A5568' }}>{ev.tickets}</td>
              <td style={{ padding: '16px 0', textAlign: 'right' }}>
                <button onClick={() => handleDeleteEvent(ev.id)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ backgroundColor: '#fff', padding: '48px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', backgroundColor: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
        <Settings size={32} color="#94A3B8" />
      </div>
      <h2 style={{ fontSize: '20px', color: '#0F172A', fontWeight: '700', marginBottom: '8px' }}>{title} Module</h2>
      <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto' }}>This functional area is connected to the state router but currently awaiting backend connection for full data display.</p>
    </div>
  );

  const renderCheckIn = () => (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '18px', color: '#0F172A', fontWeight: '700', marginBottom: '8px' }}>Attendee Check-In</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Scan or manually toggle attendee arrivals at the venue gate.</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B', fontSize: '14px' }}>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Attendee Name</th>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Email Address</th>
            <th style={{ padding: '12px 0', fontWeight: '500' }}>Event</th>
            <th style={{ padding: '12px 0', fontWeight: '500', textAlign: 'right' }}>Status / Action</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '16px 0', color: '#0F172A', fontWeight: '600' }}>{a.name}</td>
              <td style={{ padding: '16px 0', color: '#64748B' }}>{a.email}</td>
              <td style={{ padding: '16px 0', color: '#4A5568' }}>{a.event}</td>
              <td style={{ padding: '16px 0', textAlign: 'right' }}>
                <button 
                  onClick={() => toggleCheckIn(a.id)} 
                  style={{ 
                    border: 'none', 
                    background: a.checkedIn ? '#10B981' : '#F1F5F9', 
                    color: a.checkedIn ? '#fff' : '#64748B', 
                    padding: '8px 16px', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    minWidth: '100px',
                    transition: 'all 0.2s'
                  }}
                >
                  {a.checkedIn ? 'Checked In ✓' : 'Check In ->'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <DashboardSidebar role="admin" activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#0F172A', fontWeight: '800', marginBottom: '8px', textTransform: 'capitalize' }}>
              Admin {activeTab}
            </h1>
            <p style={{ color: '#64748B', fontSize: '15px' }}>Manage events, users, rules, and analytics.</p>
          </div>
          {activeTab !== 'create' && (
             <Link 
              to="/admin-dashboard/create-event"
              style={{ backgroundColor: '#5D5CDE', textDecoration: 'none', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={18} /> New Modular Event
            </Link>
          )}
        </div>

        {/* Dynamic View Rendering logic */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'approvals' && renderDashboard()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'automation' && renderAutomation()}
        {activeTab === 'bookings' && renderCheckIn()}
        {['users', 'settings'].includes(activeTab) && renderPlaceholder(activeTab)}

      </main>

      {/* Rule Creator Modal */}
      {isRuleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="#F59E0B" /> Create Automation Rule
              </h2>
              <button onClick={() => setIsRuleModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: '24px', lineHeight: '1' }}>&times;</button>
            </div>
            <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4A5568', marginBottom: '6px' }}>Trigger Type</label>
                <select 
                  value={newRule.triggerType} 
                  onChange={(e) => setNewRule({...newRule, triggerType: e.target.value})}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }}>
                  <option>Time-based</option>
                  <option>Attendee Behavior</option>
                  <option>Capacity/Ticket Count</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4A5568', marginBottom: '6px' }}>Trigger Condition</label>
                <input 
                  type="text" 
                  value={newRule.trigger} 
                  onChange={(e) => setNewRule({...newRule, trigger: e.target.value})}
                  placeholder="e.g. 24 hours before event starts" 
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4A5568', marginBottom: '6px' }}>Automated Action</label>
                <select 
                  value={newRule.action} 
                  onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }}>
                  <option>Send Email to Attendees</option>
                  <option>Send SMS to Attendees</option>
                  <option>Alert Organizer/Staff</option>
                  <option>Send Feedback Survey</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsRuleModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: '600', color: '#4A5568', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#5D5CDE', border: 'none', borderRadius: '8px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>Save Rule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
