import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ role, children }) {
  const { user }   = useAuth();
  const location   = useLocation();

  if (!user) {
    return <Navigate to={`/auth/login?role=${role}`} state={{ from: location }} replace />;
  }
  if (user.role !== role) {
    const home = user.role === 'doctor' ? '/doctor/dashboard' : '/patient/home';
    return <Navigate to={home} replace />;
  }
  return children;
}
