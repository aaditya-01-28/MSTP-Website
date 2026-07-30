import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';

const PrivacyTab = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    introText: '',
    sections: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSecIdx, setActiveSecIdx] = useState(0);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/privacy`);
      const data = await res.json();
      if (data && data.title) {
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          introText: data.introText || '',
          sections: data.sections || []
        });
      }
    } catch (err) {
      console.error('Failed to fetch privacy policy:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionContentChange = (index, fieldName, value) => {
    setFormData(prev => {
      const newSecs = [...prev.sections];
      newSecs[index] = {
        ...newSecs[index],
        [fieldName]: value
      };
      return { ...prev, sections: newSecs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/api/privacy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Privacy Policy updated successfully!');
        fetchPrivacyPolicy();
      } else {
        alert('Failed to update Privacy Policy.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Privacy Policy Editor...</div>;
  }

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Edit Privacy Policy</h2>
        <button onClick={handleSubmit} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
        
        {/* General Details card */}
        <div className="admin-card">
          <h3>Header Settings</h3>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Policy Title *</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleGeneralChange} 
              required 
              className="admin-input" 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Policy Subtitle *</label>
            <input 
              type="text" 
              name="subtitle" 
              value={formData.subtitle} 
              onChange={handleGeneralChange} 
              required 
              className="admin-input"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Introduction Paragraph *</label>
            <textarea 
              name="introText" 
              value={formData.introText} 
              onChange={handleGeneralChange} 
              required 
              rows={4}
              className="admin-textarea"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Sections card layout with selector */}
        <div className="admin-card">
          <h3>Policy Sections</h3>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }} className="privacy-admin-flex-row">
            {/* Sidebar list of sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '220px', flexShrink: 0 }}>
              {formData.sections.map((sec, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSecIdx(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: activeSecIdx === idx ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: activeSecIdx === idx ? 'var(--text-dark)' : 'var(--text-primary)',
                    fontWeight: activeSecIdx === idx ? '600' : 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {sec.title || `Section ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Active section editing fields */}
            <div style={{ flex: 1, padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
              {formData.sections[activeSecIdx] && (
                <div>
                  <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)', fontSize: '1.15rem' }}>
                    Editing: {formData.sections[activeSecIdx].title}
                  </h4>

                  <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Section Header Title *</label>
                    <input 
                      type="text" 
                      value={formData.sections[activeSecIdx].title || ''} 
                      onChange={(e) => handleSectionContentChange(activeSecIdx, 'title', e.target.value)} 
                      required 
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  {/* If section 2, show sub columns layout */}
                  {formData.sections[activeSecIdx].number === 2 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Col 2.1 Title *</label>
                          <input 
                            type="text" 
                            value={formData.sections[activeSecIdx].col1Title || ''} 
                            onChange={(e) => handleSectionContentChange(activeSecIdx, 'col1Title', e.target.value)} 
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                          <label style={{ fontWeight: 'bold', display: 'block', marginTop: '12px', marginBottom: '6px' }}>Col 2.1 Content (use • for bullets) *</label>
                          <textarea 
                            value={formData.sections[activeSecIdx].col1Content || ''} 
                            onChange={(e) => handleSectionContentChange(activeSecIdx, 'col1Content', e.target.value)} 
                            rows={6}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Col 2.2 Title *</label>
                          <input 
                            type="text" 
                            value={formData.sections[activeSecIdx].col2Title || ''} 
                            onChange={(e) => handleSectionContentChange(activeSecIdx, 'col2Title', e.target.value)} 
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                          />
                          <label style={{ fontWeight: 'bold', display: 'block', marginTop: '12px', marginBottom: '6px' }}>Col 2.2 Content (use • for bullets) *</label>
                          <textarea 
                            value={formData.sections[activeSecIdx].col2Content || ''} 
                            onChange={(e) => handleSectionContentChange(activeSecIdx, 'col2Content', e.target.value)} 
                            rows={6}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Section Content (use • for bullet lists) *</label>
                      <textarea 
                        value={formData.sections[activeSecIdx].content || ''} 
                        onChange={(e) => handleSectionContentChange(activeSecIdx, 'content', e.target.value)} 
                        required 
                        rows={8}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
                      />
                    </div>
                  )}

                  <div className="form-group" style={{ marginTop: '1.2rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Icon Name (Lucide Icon Reference) *</label>
                    <select
                      value={formData.sections[activeSecIdx].iconName || 'Shield'}
                      onChange={(e) => handleSectionContentChange(activeSecIdx, 'iconName', e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option value="FileText">FileText (Introduction)</option>
                      <option value="Database">Database (Data/Collect/Cookies)</option>
                      <option value="Settings">Settings (How We Use)</option>
                      <option value="Shield">Shield (Protection)</option>
                      <option value="Mail">Mail (Sharing/Contact)</option>
                      <option value="Link">Link (Third-Party)</option>
                      <option value="User">User (Rights)</option>
                      <option value="RotateCw">RotateCw (Updates)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PrivacyTab;
