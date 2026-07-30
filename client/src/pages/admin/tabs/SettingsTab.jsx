import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    privacyPolicy: '',
    aboutUsText: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    logoUrl: '',
    socialLinks: {
      instagram: '',
      linkedin: '',
      whatsapp: '',
      twitter: '',
      facebook: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`);
      const data = await res.json();
      if (data && data._id) {
        setSettings(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const platform = name.split('_')[1];
      setSettings(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [platform]: value }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Settings saved successfully!');
        setIsEditing(false);
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      setMessage('Server error.');
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading settings...</div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Site Settings</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            {isEditing ? 'Editing mode active. Make changes below and click "Save Settings".' : 'Site settings are locked. Click "Edit Settings" to make changes.'}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isEditing ? (
            <>
              <button 
                type="button" 
                onClick={() => { fetchSettings(); setIsEditing(false); setMessage(''); }} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSubmit} 
                className="btn btn-primary" 
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)} 
              className="btn btn-primary"
            >
              Edit Settings
            </button>
          )}
        </div>
      </div>

      {message && (
        <div style={{
          padding: '12px 16px', 
          backgroundColor: message.includes('success') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
          border: `1px solid ${message.includes('success') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          marginBottom: '20px', 
          borderRadius: '8px', 
          color: message.includes('success') ? '#10b981' : '#ef4444',
          fontWeight: 600
        }}>
          {message}
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
        {/* Left Column: General & Contact */}
        <div>
          <h3>Contact Details</h3>
          <div className="form-group" style={{marginBottom: '1rem', marginTop: '1rem'}}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Contact Email</label>
            <input type="email" name="contactEmail" value={settings.contactEmail || ''} onChange={handleChange} disabled={!isEditing} className="admin-input" />
          </div>
          <div className="form-group" style={{marginBottom: '1rem'}}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Contact Phone</label>
            <input type="text" name="contactPhone" value={settings.contactPhone || ''} onChange={handleChange} disabled={!isEditing} className="admin-input" />
          </div>
          <div className="form-group" style={{marginBottom: '1rem'}}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Contact Address</label>
            <textarea name="contactAddress" value={settings.contactAddress || ''} onChange={handleChange} disabled={!isEditing} className="admin-input" rows="3"></textarea>
          </div>

          <h3 style={{marginTop: '2rem'}}>Logo</h3>
          <div className="form-group" style={{marginBottom: '1rem', marginTop: '1rem'}}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Upload Logo (Replaces Current)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={!isEditing} className="admin-input" style={{padding: '0.5rem'}} />
            {settings.logoUrl && (
              <div style={{marginTop: '1rem'}}>
                <img src={settings.logoUrl} alt="Logo Preview" style={{maxWidth: '150px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '8px'}} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Socials & Text */}
        <div>
          <h3>Social Media Links</h3>
          <div style={{ marginTop: '1rem' }}>
            {['instagram', 'linkedin', 'whatsapp', 'twitter', 'facebook'].map(platform => (
              <div className="form-group" key={platform} style={{marginBottom: '1rem'}}>
                <label style={{textTransform: 'capitalize', display: 'block', marginBottom: '6px', fontWeight: 600}}>{platform} URL</label>
                <input 
                  type="text" 
                  name={`social_${platform}`} 
                  value={settings.socialLinks?.[platform] || ''} 
                  onChange={handleChange} 
                  disabled={!isEditing}
                  className="admin-input" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop: '2rem', marginBottom: '4rem'}}>
        <h3>About Us Text (Shown on Careers Page)</h3>
        <textarea name="aboutUsText" value={settings.aboutUsText || ''} onChange={handleChange} disabled={!isEditing} className="admin-input" rows="5" style={{ marginTop: '0.8rem' }}></textarea>
      </div>
    </div>
  );
};

export default SettingsTab;
