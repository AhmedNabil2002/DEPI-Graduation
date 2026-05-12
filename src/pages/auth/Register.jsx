import { useState } from 'react';
import { useNavigate, useSearchParams, Link, Navigate } from 'react-router-dom';
import { HiOutlineLocationMarker, HiUser, HiArrowLeft } from 'react-icons/hi';
import { MdLocalHospital } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { user, register } = useAuth();
  const navigate           = useNavigate();
  const [params]           = useSearchParams();
  const role               = params.get('role') || 'patient';

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  if (user) {
    return <Navigate to={user.role === 'doctor' ? '/doctor/dashboard' : '/patient/home'} replace />;
  }

  const isDoctor  = role === 'doctor';
  const accent    = isDoctor ? '#10b981' : 'var(--primary)';
  const accentBg  = isDoctor ? '#ecfdf5' : 'var(--primary-light)';
  const RoleIcon  = isDoctor ? MdLocalHospital : HiUser;
  const roleLabel = isDoctor ? 'Therapist' : 'Patient';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const session = register(name.trim(), email.trim().toLowerCase(), password, role);
      navigate(session.role === 'doctor' ? '/doctor/dashboard' : '/patient/home', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', fontSize: 14,
    border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
    outline: 'none', transition: 'border-color .2s',
    boxSizing: 'border-box', background: '#fff',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #fff 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: 24,
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:800, fontSize:22, color:'var(--primary)', marginBottom:40 }}>
        <HiOutlineLocationMarker size={24} /> PhysioHome
      </div>

      <div style={{ width:'100%', maxWidth:420, background:'#fff', borderRadius:'var(--radius-xl)', boxShadow:'var(--shadow-md)', padding:'40px 36px' }}>
        {/* Role badge */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
          <div style={{ width:44, height:44, borderRadius:'var(--radius-md)', background:accentBg, color:accent, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <RoleIcon size={22} />
          </div>
          <div>
            <div style={{ fontSize:12, color:'var(--gray-500)', fontWeight:500 }}>Registering as</div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--gray-900)' }}>{roleLabel}</div>
          </div>
          <Link to="/auth" style={{ marginLeft:'auto', fontSize:12, color:'var(--gray-400)', display:'flex', alignItems:'center', gap:4, textDecoration:'none' }}>
            <HiArrowLeft size={13} /> Change role
          </Link>
        </div>

        <h1 style={{ fontSize:26, fontWeight:800, color:'var(--gray-900)', marginBottom:6 }}>Create account</h1>
        <p style={{ fontSize:14, color:'var(--gray-500)', marginBottom:28 }}>Join PhysioHome and start your journey.</p>

        {error && (
          <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'var(--radius-md)', padding:'10px 14px', marginBottom:20, fontSize:13, color:'#dc2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--gray-700)', display:'block', marginBottom:6 }}>Full name</label>
            <input
              type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="John Smith" style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e  => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--gray-700)', display:'block', marginBottom:6 }}>Email address</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e  => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--gray-700)', display:'block', marginBottom:6 }}>Password</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters" style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e  => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--gray-700)', display:'block', marginBottom:6 }}>Confirm password</label>
            <input
              type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••" style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e  => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop:8, padding:'13px', borderRadius:'var(--radius-md)', border:'none',
            background: accent, color:'#fff', fontSize:15, fontWeight:700,
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1,
            transition:'opacity .2s',
          }}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:13, color:'var(--gray-400)', marginTop:24 }}>
          Already have an account?{' '}
          <Link to={`/auth/login?role=${role}`} style={{ color:accent, fontWeight:600, textDecoration:'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
