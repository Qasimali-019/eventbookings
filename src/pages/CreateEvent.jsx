import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { 
  CalendarDays, Ticket, Video, MessageSquare, 
  Wand2, Settings2, Trash2, Plus, MoveVertical, 
  Save, CheckCircle2, ChevronDown, ChevronRight 
} from 'lucide-react';
import './Dashboard.css';

const CreateEvent = () => {
  const [activeTab, setActiveTab] = useState('events'); // To keep sidebar active state correct
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  // Builder State
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState(false);
  const [basicDetails, setBasicDetails] = useState({ title: '', date: '', location: '', type: 'In-Person' });
  const [modules, setModules] = useState([]);
  
  const [agendaSessions, setAgendaSessions] = useState([
    { id: 1, time: '09:00', title: 'Keynote' },
    { id: 2, time: '11:00', title: 'Networking' }
  ]);
  const [ticketTiers, setTicketTiers] = useState([
    { id: 1, name: 'General Admission', price: 0, capacity: 100 },
    { id: 2, name: 'VIP Pass', price: 150, capacity: 20 }
  ]);

  const [aiSuggestions, setAiSuggestions] = useState([
    "Add a 'Virtual Access' module, 40% of attendees prefer hybrid options for this category.",
    "Include a 'Speaker Bios' section to boost early-bird signups by 15%.",
    "Don't forget to configure an automated '24-hour reminder' email."
  ]);

  const handleAddModule = (type, title) => {
    setModules([...modules, { id: `m${Date.now()}`, type, title, isExpanded: true }]);
  };

  const handleTemplateSelect = (template) => {
    if (template === 'conference') {
      setModules([
        { id: 'm1', type: 'AGENDA', title: 'Interactive Agenda', isExpanded: true },
        { id: 'm2', type: 'TICKETS', title: 'Ticketing & Registration', isExpanded: true }
      ]);
    } else if (template === 'webinar') {
      setModules([
        { id: 'm1', type: 'HYBRID', title: 'Virtual/Livestream Hub', isExpanded: true },
        { id: 'm2', type: 'ENGAGEMENT', title: 'Chat & Polls', isExpanded: true }
      ]);
    } else {
      setModules([]); // Blank slate
    }
    setHasSelectedTemplate(true);
  };

  const removeModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const toggleModule = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, isExpanded: !m.isExpanded } : m));
  };

  // Save Event Payload Mock
  const handleSave = () => {
    // Collect all data from modular state and basic details
    addEvent({
      title: basicDetails.title || 'Draft Event',
      date: basicDetails.date || new Date().toISOString().split('T')[0],
      price: 0, // Should calculate from tickets
      organiser: 'Admin User',
      category: 'Business',
      status: 'Published'
    });
    navigate('/admin-dashboard');
  };

  const renderModuleContent = (module) => {
    switch (module.type) {
      case 'AGENDA':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {agendaSessions.map((session, idx) => (
              <div key={session.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="time" 
                  value={session.time} 
                  onChange={(e) => {
                    const newS = [...agendaSessions]; newS[idx].time = e.target.value; setAgendaSessions(newS);
                  }} 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  placeholder="Session Title (e.g. Keynote)" 
                  value={session.title} 
                  onChange={(e) => {
                    const newS = [...agendaSessions]; newS[idx].title = e.target.value; setAgendaSessions(newS);
                  }}
                  style={inputStyle} 
                />
                <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setAgendaSessions(agendaSessions.filter(s => s.id !== session.id))} />
              </div>
            ))}
            <button onClick={() => setAgendaSessions([...agendaSessions, { id: Date.now(), time: '12:00', title: '' }])} style={{ ...btnOutlineStyle, alignSelf: 'flex-start' }}><Plus size={16} /> Add Session</button>
          </div>
        );
      case 'TICKETS':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ticketTiers.map((tier, idx) => (
              <div key={tier.id} className="ticket-row">
                <input 
                  type="text" placeholder="Tier (e.g. GA)" value={tier.name} 
                  onChange={(e) => { const newT = [...ticketTiers]; newT[idx].name = e.target.value; setTicketTiers(newT); }}
                  style={inputStyle} 
                />
                <input 
                  type="number" placeholder="Price $" value={tier.price} 
                  onChange={(e) => { const newT = [...ticketTiers]; newT[idx].price = e.target.value; setTicketTiers(newT); }}
                  style={inputStyle} 
                />
                <input 
                  type="number" placeholder="Capacity" value={tier.capacity} 
                  onChange={(e) => { const newT = [...ticketTiers]; newT[idx].capacity = e.target.value; setTicketTiers(newT); }}
                  style={inputStyle} 
                />
                <Trash2 size={18} color="#ef4444" className="trash-icon" onClick={() => setTicketTiers(ticketTiers.filter(t => t.id !== tier.id))} />
              </div>
            ))}
            <button onClick={() => setTicketTiers([...ticketTiers, { id: Date.now(), name: '', price: 0, capacity: 100 }])} style={{ ...btnOutlineStyle, alignSelf: 'flex-start' }}><Plus size={16} /> Add Ticket Tier</button>
          </div>
        );
      case 'HYBRID':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={labelStyle}>Livestream / Meeting Provider</label>
            <select style={inputStyle}>
              <option>Zoom (Integrated)</option>
              <option>Google Meet</option>
              <option>Custom RMTP Stream</option>
            </select>
            <label style={labelStyle}>Join Link (Optional)</label>
            <input type="url" placeholder="https://zoom.us/j/123456789" style={inputStyle} />
          </div>
        );
      case 'ENGAGEMENT':
        return (
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Enable Live Chat
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Enable Q&A / Polls
            </label>
          </div>
        );
      default:
        return <p>Config area for {module.title}</p>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <DashboardSidebar role="admin" activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="dashboard-content create-event-container">
        
        {!hasSelectedTemplate ? (
          <div className="template-selector">
            <h1 className="builder-title">What kind of event are you building?</h1>
            <p className="builder-subtitle">Start with a template pre-loaded with the right modules, or build from scratch.</p>
            
            <div className="template-grid">
              <div onClick={() => handleTemplateSelect('conference')} className="template-card conference-card">
                <CalendarDays size={32} color="#5D5CDE" />
                <h3>Conference / Summit</h3>
                <p>Includes Agenda, Tickets, and Speaker modules.</p>
              </div>
              <div onClick={() => handleTemplateSelect('webinar')} className="template-card webinar-card">
                <Video size={32} color="#10b981" />
                <h3>Virtual Webinar</h3>
                <p>Includes Virtual Hub and Audience Engagement.</p>
              </div>
              <div onClick={() => handleTemplateSelect('blank')} className="template-card blank-card">
                <Plus size={32} color="#f59e0b" />
                <h3>Blank Slate</h3>
                <p>Start fresh and add only the modules you need.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="builder-header">
              <div className="builder-header-text">
                <h1>Event Builder</h1>
                <p>Design your event flow visually with modules.</p>
              </div>
              <div className="builder-actions">
                <button onClick={() => navigate('/admin-dashboard')} className="btn-cancel">Cancel</button>
                <button onClick={handleSave} className="btn-save"><Save size={18} /> Publish Event</button>
              </div>
            </div>

            <div className="builder-canvas-grid">
          {/* Main Canvas */}
          <div className="builder-main-canvas">
            
            {/* Global Settings Block */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}><Settings2 size={20} color="#5D5CDE" /> Core Setup</h2>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Event Title</label>
                  <input type="text" placeholder="Awesome Tech Conf" value={basicDetails.title} onChange={(e) => setBasicDetails({...basicDetails, title: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Event Format</label>
                  <select value={basicDetails.type} onChange={(e) => setBasicDetails({...basicDetails, type: e.target.value})} style={inputStyle}>
                    <option>In-Person</option>
                    <option>Virtual</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Start Date & Time</label>
                  <input type="datetime-local" value={basicDetails.date} onChange={(e) => setBasicDetails({...basicDetails, date: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Location (if physical)</label>
                  <input type="text" placeholder="San Francisco, CA" value={basicDetails.location} onChange={(e) => setBasicDetails({...basicDetails, location: e.target.value})} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Modular Blocks Canvas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#475569' }}>Event Structure</h3>
              {modules.map((m, index) => (
                <div key={m.id} style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: m.isExpanded ? '1px solid #e2e8f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'grab' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <MoveVertical size={16} color="#94a3b8" />
                      <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '15px' }}>{index + 1}. {m.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span onClick={() => removeModule(m.id)} style={{ cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></span>
                      <span onClick={() => toggleModule(m.id)} style={{ cursor: 'pointer', color: '#64748b' }}>
                        {m.isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </span>
                    </div>
                  </div>
                  {m.isExpanded && (
                    <div style={{ padding: '24px' }}>
                      {renderModuleContent(m)}
                    </div>
                  )}
                </div>
              ))}

              {/* Add Builder Placeholder */}
              <div style={{ padding: '32px', border: '2px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
                <p style={{ color: '#64748b', marginBottom: '16px' }}>Drag & Drop to reorder, or add new modules from the library.</p>
              </div>
            </div>

          </div>

          {/* Right Sidebar - Toolbox & AI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ ...cardStyle, background: 'linear-gradient(145deg, #1e1b4b, #312e81)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Wand2 size={18} color="#a5b4fc" /> AI Copilot
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aiSuggestions.map((sug, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#a5b4fc', marginTop: '2px' }}>✨</span>
                    <p style={{ color: '#e0e7ff', fontSize: '13px', lineHeight: '1.5' }}>{sug}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Module Library</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => handleAddModule('AGENDA', 'Detailed Agenda')} style={moduleAddBtnStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CalendarDays size={18} color="#5D5CDE" /> <span style={{ fontWeight: '500', color: '#334155' }}>Agenda Planner</span></div>
                  <Plus size={16} color="#64748b" />
                </button>
                <button onClick={() => handleAddModule('HYBRID', 'Hybrid / Virtual Hub')} style={moduleAddBtnStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Video size={18} color="#10b981" /> <span style={{ fontWeight: '500', color: '#334155' }}>Virtual Session</span></div>
                  <Plus size={16} color="#64748b" />
                </button>
                <button onClick={() => handleAddModule('ENGAGEMENT', 'Audience Engagement')} style={moduleAddBtnStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare size={18} color="#f59e0b" /> <span style={{ fontWeight: '500', color: '#334155' }}>Chat & Polls</span></div>
                  <Plus size={16} color="#64748b" />
                </button>
                <button onClick={() => handleAddModule('TICKETS', 'Ticketing Options')} style={moduleAddBtnStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Ticket size={18} color="#ec4899" /> <span style={{ fontWeight: '500', color: '#334155' }}>Ticket Setup</span></div>
                  <Plus size={16} color="#64748b" />
                </button>
              </div>
            </div>
            
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// Reusable Styles (for single file MVP)
const cardStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#475569'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  ':focus': { borderColor: '#5D5CDE' }
};

const btnPrimaryStyle = {
  backgroundColor: '#5D5CDE',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'inherit'
};

const btnOutlineStyle = {
  backgroundColor: 'transparent',
  color: '#5D5CDE',
  border: '1px solid #5D5CDE',
  padding: '8px 16px',
  borderRadius: '6px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: 'inherit'
};

const moduleAddBtnStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  fontFamily: 'inherit',
  transition: 'background 0.2s'
};

export default CreateEvent;
