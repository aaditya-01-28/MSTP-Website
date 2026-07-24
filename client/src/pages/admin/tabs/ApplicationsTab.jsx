import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const ApplicationsTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await fetch(`${API_BASE_URL}/api/applications/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchApplications();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const filteredApps = applications.filter(app => {
    const query = search.toLowerCase();
    const fullName = `${app.firstName || ''} ${app.lastName || ''}`.toLowerCase();
    const job = (app.jobTitle || '').toLowerCase();
    const email = (app.email || '').toLowerCase();
    return fullName.includes(query) || job.includes(query) || email.includes(query);
  });

  const handleExport = () => {
    exportToExcel(applications, 'Job_Applications', [
      'jobTitle', 'jobId', 'firstName', 'lastName', 'email', 
      'countryCode', 'phone', 'country', 'city', 'resumeName', 
      'githubUrl', 'linkedinUrl', 'coverLetter', 'appliedAt', 'createdAt'
    ]);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <div>
          <h2>Job Applications</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Total Submissions: {applications.length}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by name, job, or email..." 
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
        <p style={{ padding: '2rem', textAlign: 'center' }}>Loading applications...</p>
      ) : filteredApps.length === 0 ? (
        <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No job applications found.
        </p>
      ) : (
        <div className="data-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Applied Position</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Resume / Portfolios</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => (
                <tr key={app._id}>
                  <td>
                    <strong>{app.firstName} {app.lastName}</strong>
                  </td>
                  <td>
                    <span className="badge badge-published" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                      {app.jobTitle || 'General'}
                    </span>
                    {app.jobId && <small style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '2px' }}>ID: {app.jobId}</small>}
                  </td>
                  <td>
                    <div>{app.email}</div>
                    <small style={{ color: 'var(--text-secondary)' }}>{app.countryCode} {app.phone}</small>
                  </td>
                  <td>{app.city ? `${app.city}, ${app.country}` : app.country || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                      {app.resumeName && <span>📄 {app.resumeName}</span>}
                      {app.linkedinUrl && (
                        <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
                          LinkedIn Profile
                        </a>
                      )}
                      {app.githubUrl && (
                        <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                          GitHub Profile
                        </a>
                      )}
                    </div>
                  </td>
                  <td>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}</td>
                  <td>
                    <div className="action-buttons">
                      {app.coverLetter && (
                        <button className="btn-sm btn-edit" onClick={() => setSelectedApp(app)} title="View Details">
                          👁️ View
                        </button>
                      )}
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(app._id)} title="Delete Application">
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

      {/* Modal for Cover Letter details */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h3>Application Details: {selectedApp.firstName} {selectedApp.lastName}</h3>
            <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
              <strong>Applied For:</strong> {selectedApp.jobTitle}
            </p>
            <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
              <strong>Email:</strong> {selectedApp.email} | <strong>Phone:</strong> {selectedApp.phone}
            </p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Cover Letter / Notes:</label>
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
                {selectedApp.coverLetter || 'No cover letter provided.'}
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedApp(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTab;
