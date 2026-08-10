import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import AdminPagination from '../components/AdminPagination';

const BulkReplyTab = () => {
  const [targetGroup, setTargetGroup] = useState('applications'); // 'applications' | 'contacts' | 'consultations' | 'all'
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  
  // Track selected items by unique record ID instead of raw email string
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  // Track specific recipient ID to preview in live email preview
  const [previewId, setPreviewId] = useState('');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [sending, setSending] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null); // { type: 'success' | 'error', text: '' }

  useEffect(() => {
    setCurrentPage(1);
  }, [targetGroup, statusFilter, search]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const [appRes, contactRes, consultRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/applications`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/api/contacts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/api/consultations`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const appData = await appRes.json();
      const contactData = await contactRes.json();
      const consultData = await consultRes.json();

      if (Array.isArray(appData)) setApplications(appData);
      if (Array.isArray(contactData)) setContacts(contactData);
      if (Array.isArray(consultData)) setConsultations(consultData);
    } catch (err) {
      console.error('Error fetching data for bulk reply:', err);
    } finally {
      setLoading(false);
    }
  };

  // Consolidate list based on targetGroup selection
  const getCombinedList = () => {
    let list = [];
    if (targetGroup === 'applications' || targetGroup === 'all') {
      const appItems = applications.map(app => ({
        id: `app_${app._id}`,
        type: 'Applicant',
        name: `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'Applicant',
        firstName: app.firstName || 'Applicant',
        email: app.email,
        detail: app.jobTitle || 'Job Application',
        date: app.appliedAt || app.createdAt,
        status: app.status || 'Pending',
        raw: app
      }));
      list = [...list, ...appItems];
    }

    if (targetGroup === 'contacts' || targetGroup === 'all') {
      const contactItems = contacts.map(c => ({
        id: `contact_${c._id}`,
        type: 'Contact Inquiry',
        name: c.name || 'Contact',
        firstName: (c.name || 'Contact').split(' ')[0],
        email: c.email,
        detail: c.subject || 'Inquiry',
        date: c.submittedAt || c.createdAt,
        status: c.status || 'Pending',
        raw: c
      }));
      list = [...list, ...contactItems];
    }

    if (targetGroup === 'consultations' || targetGroup === 'all') {
      const consultItems = consultations.map(c => ({
        id: `consult_${c._id}`,
        type: 'Consultation',
        name: c.name || 'Client',
        firstName: (c.name || 'Client').split(' ')[0],
        email: c.email,
        detail: c.service || 'Consultation',
        date: c.submittedAt || c.createdAt,
        status: c.status || 'Pending',
        raw: c
      }));
      list = [...list, ...consultItems];
    }
    return list;
  };

  // Filter list by status & search query
  const filteredList = getCombinedList().filter(item => {
    if (!item.email) return false;
    const matchesStatus = statusFilter === 'All' || (item.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.detail.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Select / Deselect handlers using unique IDs
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(filteredList.map(item => item.id));
      setSelectedIds(allIds);
      if (filteredList.length > 0) setPreviewId(filteredList[0].id);
    } else {
      setSelectedIds(new Set());
      setPreviewId('');
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setPreviewId(id); // Automatically switch preview to newly selected recipient
      }
      return next;
    });
  };

  // Selected items list
  const selectedItems = filteredList.filter(item => selectedIds.has(item.id));

  // Get preview item based on previewId or fallback to 1st selected item
  const getPreviewItem = () => {
    if (previewId) {
      const found = filteredList.find(item => item.id === previewId);
      if (found) return found;
    }
    return selectedItems[0] || filteredList[0] || null;
  };

  const previewItem = getPreviewItem();
  const currentDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const renderPersonalized = (text) => {
    if (!text) return '';
    const name = previewItem ? previewItem.name : '[Recipient Name]';
    const fName = previewItem ? previewItem.firstName : '[First Name]';
    return text
      .replace(/\{name\}/g, name)
      .replace(/\{firstName\}/g, fName)
      .replace(/\{date\}/g, currentDateStr);
  };

  // Insert dynamic placeholder tags into active input
  const insertTag = (tag, field) => {
    if (field === 'subject') {
      setSubject(prev => `${prev} ${tag}`);
    } else {
      setMessage(prev => `${prev} ${tag}`);
    }
  };

  // Send Bulk Email submit handler
  const handleSendBulk = async (e) => {
    e.preventDefault();
    if (selectedIds.size === 0) {
      alert('Please select at least one recipient from the list.');
      return;
    }
    if (!subject.trim() || !message.trim()) {
      alert('Please enter a subject line and message body.');
      return;
    }

    if (!window.confirm(`Are you sure you want to send this bulk email to ${selectedIds.size} selected item(s)?`)) {
      return;
    }

    setSending(true);
    setAlertInfo(null);

    const recipientObjects = selectedItems.map(item => ({
      email: item.email,
      name: item.name,
      firstName: item.firstName
    }));

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/api/admin/bulk-reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipients: recipientObjects,
          subject,
          message
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse response JSON:', jsonErr);
      }

      if (res.ok) {
        setAlertInfo({
          type: 'success',
          text: data.message || `Successfully sent ${data.sentCount} emails!`
        });
        setSelectedIds(new Set());
      } else {
        setAlertInfo({
          type: 'error',
          text: data.error || `Server Error (${res.status}): Failed to send bulk emails. Please check SMTP settings on server.`
        });
      }
    } catch (err) {
      console.error(err);
      setAlertInfo({
        type: 'error',
        text: `Network / Request Error: ${err.message || 'Check server connection.'}`
      });
    } finally {
      setSending(false);
    }
  };

  const isAllSelected = filteredList.length > 0 && filteredList.every(item => selectedIds.has(item.id));

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Bulk Custom Reply</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Send custom personalized bulk email responses to Applicants and Contact Inquiries.
          </p>
        </div>

        <button 
          onClick={handleSendBulk} 
          disabled={sending || selectedIds.size === 0} 
          className="btn btn-primary"
          style={{ minWidth: '150px' }}
        >
          {sending ? 'Sending Emails...' : `Send to ${selectedIds.size} Selected`}
        </button>
      </div>

      {alertInfo && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: alertInfo.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${alertInfo.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          marginTop: '1.5rem',
          borderRadius: '8px',
          color: alertInfo.type === 'success' ? '#10b981' : '#ef4444',
          fontWeight: 600
        }}>
          {alertInfo.text}
        </div>
      )}

      {/* Target Selection & Filter Bar */}
      <div className="admin-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Target Group Selector Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn-sm ${targetGroup === 'applications' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => { setTargetGroup('applications'); setSelectedIds(new Set()); setPreviewId(''); }}
            >
              Job Applicants ({applications.length})
            </button>
            <button
              type="button"
              className={`btn-sm ${targetGroup === 'contacts' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => { setTargetGroup('contacts'); setSelectedIds(new Set()); setPreviewId(''); }}
            >
              Contact Inquiries ({contacts.length})
            </button>
            <button
              type="button"
              className={`btn-sm ${targetGroup === 'consultations' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => { setTargetGroup('consultations'); setSelectedIds(new Set()); setPreviewId(''); }}
            >
              Consultations ({consultations.length})
            </button>
            <button
              type="button"
              className={`btn-sm ${targetGroup === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => { setTargetGroup('all'); setSelectedIds(new Set()); setPreviewId(''); }}
            >
              All ({applications.length + contacts.length + consultations.length})
            </button>
          </div>

          {/* Search & Status Filters */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Contacted">Contacted</option>
              <option value="Onboarded">Onboarded</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                minWidth: '220px'
              }}
            />
          </div>

        </div>
      </div>

      {/* Main Grid: Recipient Table & Email Composer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '1.2rem', marginTop: '1.2rem' }}>
        
        {/* Recipient Selection Table */}
        <div className="admin-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
          <div style={{ padding: '0.9rem 1.2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
              Select Recipients ({filteredList.length})
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
              {selectedIds.size} Selected
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading recipients...</div>
            ) : filteredList.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No matching recipients found.</div>
            ) : (
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)' }}>
                    <th style={{ width: '36px', textAlign: 'center', padding: '8px 6px' }}>
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        style={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th style={{ padding: '8px 10px' }}>Name & Email</th>
                    <th style={{ padding: '8px 10px' }}>Type / Role</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map((item) => {
                    const isChecked = selectedIds.has(item.id);
                    return (
                      <tr 
                        key={item.id} 
                        style={{ 
                          background: isChecked ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleToggleSelect(item.id)}
                      >
                        <td style={{ textAlign: 'center', padding: '8px 6px' }} onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelect(item.id)}
                            style={{ cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.86rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.email}</div>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block' }}>{item.type}</span>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.detail}</span>
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                          <span 
                            className={`status-select status-${(item.status || 'Pending').toLowerCase()}`} 
                            style={{ 
                              display: 'inline-block', 
                              padding: '2px 8px', 
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              width: 'auto'
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination inside Bulk Reply Table Card */}
          <div style={{ padding: '0 0.8rem 0.6rem' }}>
            <AdminPagination
              currentPage={currentPage}
              totalItems={filteredList.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        {/* Email Composer & Live Preview Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Email Composer Form */}
          <div className="admin-card">
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>Compose Bulk Message</h3>
            
            <form onSubmit={handleSendBulk} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* Subject Input */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Subject Line *</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" className="btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '2px 6px' }} onClick={() => insertTag('{name}', 'subject')}>+ {'{name}'}</button>
                    <button type="button" className="btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '2px 6px' }} onClick={() => insertTag('{date}', 'subject')}>+ {'{date}'}</button>
                  </div>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Update regarding your application at MAATRSHRI - {name}"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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

              {/* Message Textarea */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Message Body *</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" className="btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '2px 6px' }} onClick={() => insertTag('{firstName}', 'message')}>+ {'{firstName}'}</button>
                    <button type="button" className="btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '2px 6px' }} onClick={() => insertTag('{name}', 'message')}>+ {'{name}'}</button>
                    <button type="button" className="btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '2px 6px' }} onClick={() => insertTag('{date}', 'message')}>+ {'{date}'}</button>
                  </div>
                </div>
                <textarea
                  required
                  rows={8}
                  placeholder="Dear {firstName},&#10;&#10;Thank you for reaching out to MAATRSHRI Group..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Dynamic Tag Help Guide */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '6px' }}>
                💡 <strong>Available Tags:</strong> <code>{'{name}'}</code> (Full Name), <code>{'{firstName}'}</code> (First Name), <code>{'{date}'}</code> (Today's Date).
              </div>

              <button 
                type="submit" 
                disabled={sending || selectedIds.size === 0} 
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {sending ? 'Sending Bulk Email...' : `Send to ${selectedIds.size} Selected Items`}
              </button>
            </form>
          </div>

          {/* Live Sample Email Preview Card with Recipient Selector */}
          <div className="admin-card" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--accent-primary)' }}>
                ✉️ Live Sample Email Preview
              </h4>

              {/* Preview Recipient Selector Dropdown */}
              {selectedItems.length > 0 && (
                <select
                  value={previewItem ? previewItem.id : ''}
                  onChange={(e) => setPreviewId(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {selectedItems.map((item, idx) => (
                    <option key={item.id} value={item.id}>
                      Preview #{idx + 1}: {item.name} ({item.email})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <strong>To:</strong> {previewItem ? `${previewItem.name} <${previewItem.email}>` : 'No recipient selected'}
              </div>
              <div><strong>Subject:</strong> {renderPersonalized(subject) || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Enter a subject line above...</span>}</div>
              <hr style={{ border: '0', height: '1px', background: 'var(--border-color)', margin: '0.4rem 0' }} />
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                {renderPersonalized(message) || 'Enter your message body above to preview output...'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BulkReplyTab;
