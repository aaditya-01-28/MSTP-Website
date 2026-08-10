import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';
import AdminPagination from '../components/AdminPagination';

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', icon: '', description: '', category: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service._id);
      setFormData(service);
    } else {
      setEditingId(null);
      setFormData({
        id: '', title: '', icon: '', description: '', category: ''
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
        setFormData({ ...formData, icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/services/${editingId}` : `${API_BASE_URL}/api/services`;
    
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
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await fetch(`${API_BASE_URL}/api/services/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchServices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Services</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => exportToExcel(services, 'Services_Data')} className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>
            📊 Export Excel
          </button>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">Add New Service</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID (URL Slug)</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map(svc => (
            <tr key={svc._id}>
              <td>{svc.id}</td>
              <td>{svc.title}</td>
              <td>{svc.category}</td>
              <td>
                <button className="admin-action-btn admin-edit-btn" onClick={() => handleOpenModal(svc)}>Edit</button>
                <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(svc._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {services.length === 0 && (
            <tr><td colSpan="4" style={{textAlign: 'center'}}>No services found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalItems={services.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>URL Slug / ID (e.g., ai-solutions)</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Category (e.g., Innovation, Enterprise)</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="admin-input" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Service Icon / GIF</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" style={{padding: '0.5rem'}} />
                {formData.icon && (
                  <img src={formData.icon} alt="Preview" style={{maxWidth: '100px', marginTop: '10px'}} />
                )}
              </div>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {editingId ? 'Save Changes' : 'Create Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
