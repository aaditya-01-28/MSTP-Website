import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';
import AdminPagination from '../components/AdminPagination';

const ConsultationsTab = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [replyConsultation, setReplyConsultation] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Reset pagination to page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/consultations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setConsultations(data);
      }
    } catch (err) {
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/consultations/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setConsultations(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replySubject || !replyMessage) {
      alert('Please enter both subject and message.');
      return;
    }
    setSendingReply(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify({
          email: replyConsultation.email,
          subject: replySubject,
          message: replyMessage
        })
      });
      if (res.ok) {
        alert('Reply sent successfully!');
        // Automatically mark status as Contacted if still Pending
        if (replyConsultation.status === 'Pending') {
          handleStatusChange(replyConsultation._id, 'Contacted');
        }
        setReplyConsultation(null);
      } else {
        alert('Failed to send reply.');
      }
    } catch (err) {
      alert('Error sending reply.');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation request?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/consultations/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        if (res.ok) {
          fetchConsultations();
        } else {
          alert('Failed to delete consultation.');
        }
      } catch (err) {
        alert('Failed to delete consultation.');
      }
    }
  };

  const filteredConsultations = consultations.filter(item => {
    const query = search.toLowerCase();
    const name = (item.name || '').toLowerCase();
    const email = (item.email || '').toLowerCase();
    const company = (item.company || '').toLowerCase();
    const service = (item.service || '').toLowerCase();
    const phone = (item.phone || '').toLowerCase();
    return name.includes(query) || email.includes(query) || company.includes(query) || service.includes(query) || phone.includes(query);
  });

  // Calculate paginated slice
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredConsultations.slice(startIndex, startIndex + pageSize);

  const handleExport = () => {
    exportToExcel(
      consultations, 
      'Book_Consultations', 
      ['name', 'email', 'phone', 'company', 'service', 'date', 'requirements', 'status', 'submittedAt', 'createdAt']
    );
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <div>
          <h2>Book Consultations</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Total Consultations: {consultations.length}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by name, email, service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              width: '260px'
            }}
          />
          <button 
            className="btn btn-outline"
            onClick={handleExport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderColor: '#10b981',
              color: '#10b981'
            }}
          >
            📊 Export to Excel
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ padding: '2rem', textAlign: 'center' }}>Loading consultation requests...</p>
      ) : filteredConsultations.length === 0 ? (
        <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No consultation bookings found.
        </p>
      ) : (
        <>
          <div className="data-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Company</th>
                  <th>Requested Service</th>
                  <th>Preferred Date</th>
                  <th>Status</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(item => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <div>{item.email}</div>
                      <small style={{ color: 'var(--text-secondary)' }}>{item.phone || '-'}</small>
                    </td>
                    <td>{item.company || '-'}</td>
                    <td>
                      <span className="badge badge-published" style={{ background: 'rgba(215, 184, 137, 0.15)', color: 'var(--accent-primary)', borderColor: 'rgba(215, 184, 137, 0.3)' }}>
                        {item.service || 'General'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{item.date || '-'}</span>
                    </td>
                    <td style={{ minWidth: '150px' }}>
                      <select 
                        value={item.status || 'Pending'} 
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`status-select status-${(item.status || 'Pending').toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{item.submittedAt ? new Date(item.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-sm btn-edit" 
                          onClick={() => {
                            setReplyConsultation(item);
                            setReplySubject(`Re: Consultation Booking for ${item.service || 'our services'} - WhiteCircle Group`);
                            setReplyMessage(`Hi ${item.name},\n\nThank you for booking a consultation with WhiteCircle Group regarding ${item.service || 'our services'}.\n\nWe would like to schedule a call with you. Please let us know your available time slots.\n\nBest regards,\nWhiteCircle Group Team`);
                          }} 
                          title="Reply via Email"
                        >
                          Reply
                        </button>
                        <button 
                          className="btn-sm btn-edit" 
                          onClick={() => setSelectedConsultation(item)} 
                          title="View Full Details"
                        >
                          View
                        </button>
                        <button 
                          className="btn-sm btn-delete" 
                          onClick={() => handleDelete(item._id)} 
                          title="Delete Request"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <AdminPagination
            currentPage={currentPage}
            totalItems={filteredConsultations.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* View Details Modal */}
      {selectedConsultation && (
        <div className="modal-backdrop" onClick={() => setSelectedConsultation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>Consultation Request Details</h3>
              <button 
                onClick={() => setSelectedConsultation(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Name</label>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px' }}>{selectedConsultation.name}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</label>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px' }}>{selectedConsultation.company || 'N/A'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                <div style={{ fontSize: '0.95rem', marginTop: '2px' }}>
                  <a href={`mailto:${selectedConsultation.email}`} style={{ color: 'var(--accent-primary)' }}>{selectedConsultation.email}</a>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
                <div style={{ fontSize: '0.95rem', marginTop: '2px' }}>
                  <a href={`tel:${selectedConsultation.phone}`} style={{ color: 'var(--text-primary)' }}>{selectedConsultation.phone || 'N/A'}</a>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Requested Service</label>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px', color: 'var(--accent-primary)' }}>{selectedConsultation.service}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Date</label>
                <div style={{ fontSize: '0.95rem', marginTop: '2px' }}>{selectedConsultation.date || 'Flexible'}</div>
              </div>
            </div>

            {selectedConsultation.requirements && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Project Requirements / Notes</label>
                <div style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)', 
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedConsultation.requirements}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => setSelectedConsultation(null)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  const item = selectedConsultation;
                  setSelectedConsultation(null);
                  setReplyConsultation(item);
                  setReplySubject(`Re: Consultation Booking for ${item.service || 'our services'} - WhiteCircle Group`);
                  setReplyMessage(`Hi ${item.name},\n\nThank you for booking a consultation with WhiteCircle Group regarding ${item.service || 'our services'}.\n\nWe would like to schedule a call with you. Please let us know your available time slots.\n\nBest regards,\nWhiteCircle Group Team`);
                }}
              >
                Reply to Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyConsultation && (
        <div className="modal-backdrop" onClick={() => setReplyConsultation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>Reply to {replyConsultation.name}</h3>
              <button 
                onClick={() => setReplyConsultation(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendReply}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Recipient</label>
                <input 
                  type="text" 
                  value={`${replyConsultation.name} <${replyConsultation.email}>`} 
                  disabled 
                  className="admin-input" 
                  style={{ opacity: 0.8 }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Subject *</label>
                <input 
                  type="text" 
                  value={replySubject} 
                  onChange={(e) => setReplySubject(e.target.value)} 
                  required 
                  className="admin-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem' }}>Message *</label>
                <textarea 
                  value={replyMessage} 
                  onChange={(e) => setReplyMessage(e.target.value)} 
                  required 
                  rows={7} 
                  className="admin-input" 
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={() => setReplyConsultation(null)}
                  disabled={sendingReply}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={sendingReply}
                >
                  {sendingReply ? 'Sending Email...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationsTab;
