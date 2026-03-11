import React, { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import { Search, CalendarDays, MapPin, XCircle, CheckCircle, Video, MessageCircle, Clock, Users, Play, Download } from 'lucide-react';
import './Dashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hubTab, setHubTab] = useState('agenda');

  // Mock Data States
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      title: 'Global Marketing Summit 2026', 
      status: 'RSVP CONFIRMED', 
      date: 'October 15, 2026', 
      location: 'Hybrid (San Francisco & Virtual)',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop',
      statusColor: '#E6F9F2',
      statusText: '#00d26a',
      isHybrid: true
    },
    { 
      id: 2, 
      title: 'Indie Rock Festival', 
      status: 'PENDING TICKETS', 
      date: 'November 2, 2026', 
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop',
      statusColor: '#FFF3E0',
      statusText: '#F57C00',
      isHybrid: false
    }
  ]);

  const allEvents = [
    { id: 3, title: 'Global Marketing Summit 2026', date: 'October 15, 2026', location: 'Hybrid', category: 'Business' },
    { id: 4, title: 'Indie Rock Festival', date: 'November 2, 2026', location: 'Austin, TX', category: 'Music' },
    { id: 5, title: 'Tech Innovators Conference', date: 'December 10, 2026', location: 'New York, NY', category: 'Technology' },
    { id: 6, title: 'Local Food Tasting', date: 'August 5, 2026', location: 'Chicago, IL', category: 'Food & Drink' },
  ];

  // User Profile State
  const [profile, setProfile] = useState({
    name: 'Alex Lee',
    email: 'alex.lee@example.com',
    phone: '+1 (555) 012-3456',
    bio: 'Avid event goer and tech enthusiast.'
  });

  // Handlers
  const handleCancelBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleFinishBooking = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'RSVP CONFIRMED', statusColor: '#E6F9F2', statusText: '#00d26a' } : b
    ));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

  const openEventHub = (booking) => {
    setSelectedEvent(booking);
    setActiveTab('eventHub');
    setHubTab('agenda');
  };

  // Render Helpers
  const renderDashboard = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', color: 'var(--bg-navy)', fontWeight: '700', marginBottom: '20px' }}>Your Upcoming Events</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {bookings.length === 0 ? (
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <CalendarDays size={48} color="#CBD5E1" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', color: 'var(--bg-navy)', marginBottom: '8px' }}>No upcoming events</h3>
              <p style={{ color: '#64748B', marginBottom: '20px' }}>You haven't booked any tickets yet.</p>
              <button className="btn-primary btn" onClick={() => setActiveTab('browse')}>Browse Events</button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} style={{ display: 'flex', gap: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={booking.image} alt={booking.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--bg-navy)', marginBottom: '8px' }}>{booking.title}</h3>
                    <span style={{ backgroundColor: booking.statusColor, color: booking.statusText, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{booking.status}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748B', fontSize: '14px', marginBottom: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalendarDays size={16} /> {booking.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {booking.location}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {booking.status === 'PENDING TICKETS' ? (
                      <button onClick={() => handleFinishBooking(booking.id)} style={{ backgroundColor: 'var(--bg-navy)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={16} color="#00d26a" /> Finish Booking</button>
                    ) : (
                      <>
                        <button onClick={() => openEventHub(booking)} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', border: 'none' }}>Enter Event Hub / Info</button>
                        <button onClick={() => handleCancelBooking(booking.id)} style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <XCircle size={16} /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', color: 'var(--bg-navy)', fontWeight: '700', marginBottom: '16px' }}>My Profile Overview</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#64748B' }}>
              {profile.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bg-navy)' }}>{profile.name}</h3>
              <p style={{ fontSize: '14px', color: '#64748B' }}>{profile.email}</p>
            </div>
          </div>
          <button onClick={() => setActiveTab('profile')} style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--bg-navy)', cursor: 'pointer' }}>Edit Profile</button>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '16px', color: 'var(--bg-navy)', fontWeight: '700', marginBottom: '16px' }}>Suggested Categories</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Technology', 'Music', 'Design', 'Business', 'Sports', 'Food & Drink'].map((cat, i) => (
                <span key={i} style={{ backgroundColor: '#F8FAFC', color: 'var(--bg-navy)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', border: '1px solid #E2E8F0' }} className="hover-bg-gray">{cat}</span>
              ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => {
    const filteredEvents = allEvents.filter(ev => ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || ev.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--bg-navy)', fontWeight: '700', marginBottom: '20px' }}>Browse All Events</h2>
        
         <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '14px' }} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter events by name or category..." 
              style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box', outline: 'none', fontFamily: 'Outfit' }}
            />
          </div>
        </div>

        <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', display: 'grid' }}>
          {filteredEvents.length > 0 ? filteredEvents.map((ev, i) => (
             <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase' }}>{ev.category}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--bg-navy)' }}>{ev.title}</h3>
                <div style={{ color: '#64748B', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CalendarDays size={14} />{ev.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} />{ev.location}</span>
                </div>
                <button className="btn-primary" style={{ marginTop: 'auto', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: '600' }}>Register Now</button>
             </div>
          )) : (
             <p style={{ color: '#64748B', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>No events found matching "{searchQuery}".</p>
          )}
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {profile.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <div>
          <h2 style={{ fontSize: '24px', color: 'var(--bg-navy)', fontWeight: '800' }}>Profile Settings</h2>
          <p style={{ color: '#64748B' }}>Update your personal information</p>
        </div>
      </div>

      <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--bg-navy)' }}>Full Name</label>
          <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} disabled={!isEditingProfile} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: isEditingProfile ? '#fff' : '#F8FAFC', color: 'var(--bg-navy)', fontFamily: 'Outfit' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--bg-navy)' }}>Email Address</label>
          <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} disabled={!isEditingProfile} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: isEditingProfile ? '#fff' : '#F8FAFC', color: 'var(--bg-navy)', fontFamily: 'Outfit' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--bg-navy)' }}>Phone Number</label>
          <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} disabled={!isEditingProfile} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: isEditingProfile ? '#fff' : '#F8FAFC', color: 'var(--bg-navy)', fontFamily: 'Outfit' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--bg-navy)' }}>Short Bio</label>
          <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} disabled={!isEditingProfile} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: isEditingProfile ? '#fff' : '#F8FAFC', color: 'var(--bg-navy)', resize: 'none', fontFamily: 'Outfit' }} />
        </div>

        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {isEditingProfile ? (
            <>
              <button type="button" onClick={() => setIsEditingProfile(false)} style={{ padding: '12px 20px', backgroundColor: 'transparent', border: 'none', color: '#64748B', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ padding: '12px 20px', border: 'none', borderRadius: '8px' }}>Save Changes</button>
            </>
          ) : (
             <button type="button" onClick={() => setIsEditingProfile(true)} style={{ padding: '12px 20px', backgroundColor: '#F8FAFC', color: 'var(--bg-navy)', border: '1px solid #E2E8F0', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Edit Profile</button>
          )}
        </div>
      </form>
    </div>
  );

  const renderEventHub = () => {
    if (!selectedEvent) return null;

    return (
      <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 120px)' }}>
        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Info */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--bg-navy)', marginBottom: '4px' }}>{selectedEvent.title}</h2>
              <p style={{ color: '#64748B', fontSize: '14px', display: 'flex', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalendarDays size={14} /> {selectedEvent.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {selectedEvent.location}</span>
                {selectedEvent.isHybrid && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', fontWeight: '600' }}><Video size={14} /> Virtual Enabled</span>}
              </p>
            </div>
            <button onClick={() => setActiveTab('dashboard')} style={{ padding: '8px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Outfit' }}>← Back to Dashboard</button>
          </div>

          {/* Virtual Player / Presentation Area */}
          {selectedEvent.isHybrid && (
            <div style={{ width: '100%', height: '400px', backgroundColor: '#000', borderRadius: '12px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={selectedEvent.image} alt="Event Cover" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,210,106,0.3)' }}>
                  <Play size={24} fill="#fff" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Live Keynote Session</h3>
                <p style={{ opacity: 0.8 }}>Starting in 15 minutes</p>
              </div>
            </div>
          )}

          {/* Dynamic Agenda */}
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <button 
                onClick={() => setHubTab('agenda')}
                style={{ padding: '16px 24px', background: hubTab === 'agenda' ? '#fff' : 'transparent', border: 'none', borderBottom: hubTab === 'agenda' ? '2px solid var(--primary-color)' : '2px solid transparent', fontWeight: '700', color: hubTab === 'agenda' ? 'var(--bg-navy)' : '#64748B', cursor: 'pointer', fontFamily: 'Outfit' }}>
                Dynamic Agenda
              </button>
              <button 
                onClick={() => setHubTab('resources')}
                style={{ padding: '16px 24px', background: hubTab === 'resources' ? '#fff' : 'transparent', border: 'none', borderBottom: hubTab === 'resources' ? '2px solid var(--primary-color)' : '2px solid transparent', fontWeight: '700', color: hubTab === 'resources' ? 'var(--bg-navy)' : '#64748B', cursor: 'pointer', fontFamily: 'Outfit' }}>
                Resources
              </button>
            </div>
            
            <div style={{ padding: '24px', overflowY: 'auto' }}>
              {hubTab === 'agenda' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px', color: 'var(--bg-navy)' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>09:00 AM</span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>1 hr</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--bg-navy)', marginBottom: '4px' }}>Welcome & Keynote Opening</h4>
                      <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Main Stage • Sarah Jenkins</p>
                      <span style={{ background: '#FFF3E0', color: '#F57C00', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '100px' }}>Up Next</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px', color: 'var(--bg-navy)' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>10:15 AM</span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>45 min</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--bg-navy)', marginBottom: '4px' }}>Panel: Future of Marketing SaaS</h4>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>Room A • Tech Track</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px', color: 'var(--bg-navy)' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>11:30 AM</span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>1 hr</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--bg-navy)', marginBottom: '4px' }}>Breakout: Growth Hacks 2026</h4>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>Virtual Room B • Growth Track</p>
                    </div>
                  </div>
                </div>
              )}

              {hubTab === 'resources' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--bg-navy)' }}>Event Official Program PDF</h4>
                      <p style={{ fontSize: '13px', color: '#64748B' }}>2.4 MB</p>
                    </div>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}><Download size={20} /></button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--bg-navy)' }}>Speaker Slides: Sarah Jenkins</h4>
                      <p style={{ fontSize: '13px', color: '#64748B' }}>12 MB</p>
                    </div>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}><Download size={20} /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Engagement Sidebar */}
        <div style={{ width: '300px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', background: 'var(--bg-navy)', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={18} />
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Live Chat</h3>
          </div>
          
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#F8FAFC' }}>
            {/* Mock Chat Messages */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 'bold' }}>JD</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--bg-navy)' }}>John Doe</span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>08:55 AM</span>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', background: '#fff', padding: '10px', borderRadius: '0 8px 8px 8px', border: '1px solid #E2E8F0' }}>Super excited for the keynote!</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 'bold' }}>MK</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--bg-navy)' }}>Mary K. (Org)</span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>08:58 AM</span>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', background: '#fff', padding: '10px', borderRadius: '0 8px 8px 8px', border: '1px solid #E2E8F0' }}>Welcome everyone! Sound check in 2 mins.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0', background: '#fff' }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontFamily: 'Outfit', outline: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Outfit' }}>
      <DashboardSidebar role="user" activeTab={activeTab === 'eventHub' ? 'mybookings' : activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', marginLeft: '260px' }}>
        {activeTab !== 'eventHub' && (
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', color: 'var(--bg-navy)', fontWeight: '800', marginBottom: '8px' }}>
              {activeTab === 'dashboard' ? 'Welcome back, ' + profile.name.split(' ')[0] + '!' : 
                activeTab === 'browse' ? 'Discover Events' : 
                activeTab === 'mybookings' ? 'My Tickets' : 'Account Settings'}
            </h1>
            <p style={{ color: '#64748B', fontSize: '15px' }}>
              {activeTab === 'dashboard' ? 'Ready for your next event? Discover what\'s happening near you.' : 'Manage your experience.'}
            </p>
          </div>
        )}

        {/* Global Action Header - Show Search unless in Profile or EventHub */}
        {activeTab !== 'profile' && activeTab !== 'browse' && activeTab !== 'eventHub' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '14px' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0) setActiveTab('browse');
                }}
                placeholder="Search for events, workshops, concerts..." 
                style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box', outline: 'none', fontFamily: 'Outfit' }}
              />
            </div>
            <button className="btn-primary" onClick={() => setActiveTab('browse')} style={{ border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '600', fontSize: '16px' }}>
              Find Events
            </button>
          </div>
        )}

        {/* Dynamic View Rendering */}
        {activeTab === 'dashboard' || activeTab === 'mybookings' ? renderDashboard() : null}
        {activeTab === 'browse' && renderBrowse()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'eventHub' && renderEventHub()}

      </main>
    </div>
  );
};

export default UserDashboard;
