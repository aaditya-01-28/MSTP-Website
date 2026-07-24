import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const TeamTab = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', role: '', image: ''
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/team`);
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingId(member._id);
      setFormData(member);
    } else {
      setEditingId(null);
      setFormData({
        name: '', role: '', image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/team/${editingId}` : `${API_BASE_URL}/api/team`;
    
    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });
      setIsModalOpen(false);
      fetchTeam();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await fetch(`${API_BASE_URL}/api/team/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchTeam();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Leadership Team</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => exportToExcel(team, 'Team_Members_Data')} className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>
            📊 Export Excel
          </button>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">Add New Member</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map(member => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                <button className="admin-action-btn admin-edit-btn" onClick={() => handleOpenModal(member)}>Edit</button>
                <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(member._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {team.length === 0 && (
            <tr><td colSpan="3" style={{textAlign: 'center'}}>No team members found.</td></tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Designation / Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" style={{padding: '0.5rem'}} />
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{maxWidth: '120px', borderRadius: '8px', marginTop: '10px'}} />
                )}
              </div>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {editingId ? 'Save Changes' : 'Create Member'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamTab;
