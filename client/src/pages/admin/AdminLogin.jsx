import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, ArrowLeft } from 'lucide-react';
import './AdminPanel.css'; // Reuse admin panel styles
import { API_BASE_URL } from '../../apiConfig';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Forgot password states
  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'reset'
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [devCodeMsg, setDevCodeMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setDevCodeMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Verification code generated and sent to email!');
        if (data.devCode) {
          setDevCodeMsg(`Dev OTP Code: ${data.devCode}`);
        }
        setMode('reset');
      } else {
        setError(data.error || 'Failed to request reset code');
      }
    } catch (err) {
      setError('Server error during forgot password');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetCode, newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Password reset successfully! You can now log in.');
        setMode('login');
        setPassword('');
        setResetCode('');
        setNewPassword('');
        setDevCodeMsg('');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Server error during password reset');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <img src="/logo.jpeg" alt="MAATRSHRI Logo" className="admin-login-logo" />
        
        {mode === 'login' && (
          <>
            <h2>Admin Portal</h2>
            <p>Login to manage website content</p>
            {error && <div className="admin-error">{error}</div>}
            {success && <div className="admin-success" style={{ padding: '0.8rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1rem' }}>{success}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="admin-input"
                  placeholder="admin@maatrshrigroup.in"
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <label style={{ margin: 0 }}>Password</label>
                  <button 
                    type="button" 
                    onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} 
                    style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="admin-input"
                    placeholder="Enter your password"
                    style={{ paddingRight: '40px' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <h2>Reset Password</h2>
            <p>Enter your admin email to receive a verification code</p>
            {error && <div className="admin-error">{error}</div>}
            
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label>Admin Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="admin-input"
                  placeholder="admin@maatrshrigroup.in"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }} disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Reset Code'}
              </button>

              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => { setMode('login'); setError(''); }} 
                style={{ width: '100%', marginTop: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> Back to Login
              </button>
            </form>
          </>
        )}

        {mode === 'reset' && (
          <>
            <h2>Set New Password</h2>
            <p>Enter the verification code and your new password</p>
            {error && <div className="admin-error">{error}</div>}
            {success && <div className="admin-success" style={{ padding: '0.8rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1rem' }}>{success}</div>}
            {devCodeMsg && <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>🔑 {devCodeMsg}</div>}

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>6-Digit Verification Code</label>
                <input 
                  type="text" 
                  value={resetCode} 
                  onChange={(e) => setResetCode(e.target.value)} 
                  required 
                  className="admin-input"
                  placeholder="e.g. 123456"
                  maxLength={6}
                  style={{ letterSpacing: '2px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    className="admin-input"
                    placeholder="Enter new password"
                    style={{ paddingRight: '40px' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }} disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password & Save'}
              </button>

              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => { setMode('login'); setError(''); }} 
                style={{ width: '100%', marginTop: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> Cancel & Back to Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
