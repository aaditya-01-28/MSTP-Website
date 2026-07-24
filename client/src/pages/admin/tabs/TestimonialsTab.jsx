import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';
import { exportToExcel } from '../../../utils/exportToExcel';

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    author: '', role: '', content: '', rating: 5, avatar: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial._id);
      setFormData(testimonial);
    } else {
      setEditingId(null);
      setFormData({
        author: '', role: '', content: '', rating: 5, avatar: ''
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
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/testimonials/${editingId}` : `${API_BASE_URL}/api/testimonials`;
    
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
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchTestimonials();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Testimonials</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => exportToExcel(testimonials, 'Testimonials_Data')} className="btn btn-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>
            📊 Export Excel
          </button>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">Add New Testimonial</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Role</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(item => (
            <tr key={item._id}>
              <td>{item.author}</td>
              <td>{item.role}</td>
              <td>{item.rating} Stars</td>
              <td>
                <button className="admin-action-btn admin-edit-btn" onClick={() => handleOpenModal(item)}>Edit</button>
                <button className="admin-action-btn admin-delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {testimonials.length === 0 && (
            <tr><td colSpan="4" style={{textAlign: 'center'}}>No testimonials found.</td></tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Author Name</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Role / Company</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Rating (1-5)</label>
                <input type="number" min="1" max="5" name="rating" value={formData.rating} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="form-group">
                <label>Testimonial Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required className="admin-input" rows="4"></textarea>
              </div>
              <div className="form-group">
                <label>Author Avatar</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" style={{padding: '0.5rem'}} />
                {formData.avatar && (
                  <img src={formData.avatar} alt="Preview" style={{maxWidth: '80px', borderRadius: '50%', marginTop: '10px'}} />
                )}
              </div>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {editingId ? 'Save Changes' : 'Create Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;
