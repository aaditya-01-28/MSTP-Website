import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';
import AdminPagination from '../components/AdminPagination';

const PortfolioTab = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', image: '', caseStudyTitle: '', description: '', challengeDescription: ''
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolios`);
      const data = await res.json();
      setPortfolios(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenModal = (portfolio = null) => {
    if (portfolio) {
      setEditingId(portfolio._id);
      setFormData(portfolio);
    } else {
      setEditingId(null);
      setFormData({
        id: '', title: '', image: '', caseStudyTitle: '', description: '', challengeDescription: ''
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
    const url = editingId ? `${API_BASE_URL}/api/portfolios/${editingId}` : `${API_BASE_URL}/api/portfolios`;
    
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
      fetchPortfolios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await fetch(`${API_BASE_URL}/api/portfolios/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchPortfolios();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Portfolio Case Studies</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => exportToExcel(portfolios, 'Portfolio_Data')} className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>
            📊 Export Excel
          </button>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">Add New Case Study</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID (URL Slug)</th>
            <th>Project Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize).map(item => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button className="admin-action-btn admin-edit-btn" onClick={() => handleOpenModal(item)}>Edit</button>
                <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {portfolios.length === 0 && (
            <tr><td colSpan="3" style={{textAlign: 'center'}}>No case studies found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalItems={portfolios.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Case Study' : 'Add New Case Study'}</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>URL Slug / ID (e.g., samraat-logs)</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Project Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Case Study Header</label>
                <input type="text" name="caseStudyTitle" value={formData.caseStudyTitle || ''} onChange={handleChange} className="admin-input" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="admin-input" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Challenge Description</label>
                <textarea name="challengeDescription" value={formData.challengeDescription || ''} onChange={handleChange} className="admin-input" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Featured Image / GIF</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" style={{padding: '0.5rem'}} />
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{maxWidth: '100px', marginTop: '10px'}} />
                )}
              </div>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {editingId ? 'Save Changes' : 'Create Case Study'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioTab;
