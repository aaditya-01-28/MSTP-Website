import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const ContactsTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyContact, setReplyContact] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      setContacts(contacts.map(item => item._id === id ? { ...item, status: newStatus } : item));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    setSendingReply(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify({
          email: replyContact.email,
          subject: replySubject,
          message: replyMessage
        })
      });
      if (res.ok) {
        alert('Reply sent successfully!');
        setReplyContact(null);
      } else {
        alert('Failed to send reply');
      }
    } catch (err) {
      alert('Error sending reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchContacts();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const filteredContacts = contacts.filter(item => {
    const query = search.toLowerCase();
    const name = (item.name || '').toLowerCase();
    const email = (item.email || '').toLowerCase();
    const subject = (item.subject || '').toLowerCase();
    return name.includes(query) || email.includes(query) || subject.includes(query);
  });

  const handleExport = () => {
    exportToExcel(contacts, 'Contact_Inquiries', ['name', 'email', 'subject', 'message', 'status', 'submittedAt', 'createdAt']);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <div>
          <h2>Contact Inquiries</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Total Inquiries: {contacts.length}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by name, email, or subject..." 
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
        <p style={{ padding: '2rem', textAlign: 'center' }}>Loading contact inquiries...</p>
      ) : filteredContacts.length === 0 ? (
        <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No contact inquiries found.
        </p>
      ) : (
        <div className="data-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>Email Address</th>
                <th>Subject</th>
                <th>Message Preview</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(item => (
                <tr key={item._id}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.email}</td>
                  <td>{item.subject || 'General Inquiry'}</td>
                  <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.message}
                  </td>
                  <td>
                    {item.createdAt || item.submittedAt 
                      ? new Date(item.createdAt || item.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                      : '-'}
                  </td>
                  <td style={{ minWidth: '160px' }}>
                    <select 
                      value={item.status || 'Pending'} 
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className={`status-select status-${(item.status || 'Pending').toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Update">Update</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-sm btn-edit" onClick={() => setReplyContact(item)} title="Reply via Email">
                        Reply
                      </button>
                      <button className="btn-sm btn-edit" onClick={() => setSelectedContact(item)} title="View Full Message">
                        View
                      </button>
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(item._id)} title="Delete Submission">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for full message details */}
      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <h3>Inquiry Details from {selectedContact.name}</h3>
            <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
              <strong>Subject:</strong> {selectedContact.subject || 'General Inquiry'}
            </p>
            
            <div style={{ marginTop: '1.2rem' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Message:</label>
              <div style={{
                background: 'var(--bg-secondary)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                whiteSpace: 'pre-wrap',
                fontSize: '0.92rem',
                maxHeight: '250px',
                overflowY: 'auto'
              }}>
                {selectedContact.message}
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedContact(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Custom Reply */}
      {replyContact && (
        <div className="modal-overlay" onClick={() => setReplyContact(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h3>Reply to {replyContact.name}</h3>
            <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
              <strong>To:</strong> {replyContact.email}
            </p>
            
            <form onSubmit={handleSendReply} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Subject:</label>
                <input 
                  type="text" 
                  required
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  placeholder="Enter email subject"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Message:</label>
                <textarea 
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    minHeight: '150px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div className="modal-actions" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setReplyContact(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={sendingReply}>
                  {sendingReply ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
