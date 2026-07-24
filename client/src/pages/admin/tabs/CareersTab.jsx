import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const CareersTab = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', department: '', type: 'Full-time', experience: '',
    location: '', date: new Date().toISOString().split('T')[0], status: 'Published',
    description: '', primarySkills: '', secondarySkills: '', overview: '', eligibility: ''
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/careers`);
      const data = await res.json();
      setCareers(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenModal = (career = null) => {
    if (career) {
      setEditingId(career._id);
      setFormData({
        id: career.id || '',
        title: career.title || '',
        department: career.department || '',
        type: career.type || 'Full-time',
        experience: career.experience || '',
        location: career.location || '',
        date: career.date ? (career.date.includes('-') ? career.date : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        status: career.status || 'Published',
        description: career.description || '',
        primarySkills: career.primarySkills || '',
        secondarySkills: career.secondarySkills || '',
        overview: career.overview || '',
        eligibility: career.eligibility || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        id: '', title: '', department: '', type: 'Full-time', experience: '',
        location: '', date: new Date().toISOString().split('T')[0], status: 'Published',
        description: '', primarySkills: '', secondarySkills: '', overview: '', eligibility: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveJob = async (statusToSet) => {
    const payload = { ...formData, status: statusToSet };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/careers/${editingId}` : `${API_BASE_URL}/api/careers`;
    
    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      });
      setIsModalOpen(false);
      fetchCareers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveJob(formData.status || 'Published');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await fetch(`${API_BASE_URL}/api/careers/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchCareers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Careers</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => exportToExcel(careers, 'Careers_Data')} className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>
            📊 Export Excel
          </button>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">Add New Job</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Department</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map(job => (
            <tr key={job._id}>
              <td><span style={{fontWeight: 600, color: 'var(--accent-primary)'}}>{job.id || job._id.substring(0, 6)}</span></td>
              <td>{job.title}</td>
              <td>{job.department}</td>
              <td>{job.type}</td>
              <td>{job.location}</td>
              <td>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: job.status === 'Draft' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                  color: job.status === 'Draft' ? '#eab308' : '#22c55e',
                  border: `1px solid ${job.status === 'Draft' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                }}>
                  {job.status || 'Published'}
                </span>
              </td>
              <td>
                <button className="admin-action-btn admin-edit-btn" onClick={() => handleOpenModal(job)}>Edit</button>
                <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {careers.length === 0 && (
            <tr><td colSpan="7" style={{textAlign: 'center'}}>No jobs found.</td></tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Job Posting' : 'Add New Job Posting'}</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              
              <div className="admin-form-row">
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Job ID (e.g., 101, SDE-1)</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="e.g. 101" className="admin-input" />
                  </div>
                </div>
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Job Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="admin-input" />
                  </div>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Department *</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required className="admin-input" />
                  </div>
                </div>
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Job Type *</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="admin-input" style={{height: '42px'}}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Experience Required *</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 0-2 years" required className="admin-input" />
                  </div>
                </div>
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Location *</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bhopal, India" required className="admin-input" />
                  </div>
                </div>
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Posting Date *</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="admin-input" style={{height: '42px'}} />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Job Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="admin-input" rows="3"></textarea>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Primary Skills</label>
                    <input type="text" name="primarySkills" value={formData.primarySkills} onChange={handleChange} placeholder="e.g. Java, React, Node.js" className="admin-input" />
                  </div>
                </div>
                <div className="admin-form-col">
                  <div className="admin-form-group">
                    <label>Secondary Skills</label>
                    <input type="text" name="secondarySkills" value={formData.secondarySkills} onChange={handleChange} placeholder="e.g. Docker, AWS, Git" className="admin-input" />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Job Overview / Focus</label>
                <textarea name="overview" value={formData.overview} onChange={handleChange} className="admin-input" rows="2"></textarea>
              </div>

              <div className="admin-form-group">
                <label>Eligibility Criteria</label>
                <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} className="admin-input" rows="2"></textarea>
              </div>

              <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end'}}>
                <button 
                  type="button" 
                  onClick={() => saveJob('Draft')} 
                  className="btn btn-outline" 
                  style={{padding: '0.7rem 1.5rem', backgroundColor: 'var(--bg-tertiary)'}}
                >
                  💾 Save as Draft
                </button>
                <button 
                  type="button" 
                  onClick={() => saveJob('Published')} 
                  className="btn btn-primary"
                  style={{padding: '0.7rem 1.5rem'}}
                >
                  {editingId ? 'Save Changes' : '🚀 Publish Job'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersTab;
