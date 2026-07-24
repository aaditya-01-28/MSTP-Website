import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const ContactsTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

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
    exportToExcel(contacts, 'Contact_Inquiries', ['name', 'email', 'subject', 'message', 'submittedAt', 'createdAt']);
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
                  <td>
                    <div className="action-buttons">
                      <button className="btn-sm btn-edit" onClick={() => setSelectedContact(item)} title="View Full Message">
                        👁️ View
                      </button>
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(item._id)} title="Delete Submission">
                        🗑️
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
    </div>
  );
};

export default ContactsTab;
