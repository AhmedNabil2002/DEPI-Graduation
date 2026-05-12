/**
 * Router — All app routes
 *
 * PUBLIC  /           → Landing
 *         /auth       → Role selector
 *         /auth/login → Login  (?role=patient|doctor)
 *         /auth/register → Register (?role=patient|doctor)
 *
 * PATIENT /patient/*  (protected — role: patient)
 * DOCTOR  /doctor/*   (protected — role: doctor)
 */

import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout  from '../layouts/PublicLayout';
import PatientLayout from '../layouts/PatientLayout';
import DoctorLayout  from '../layouts/DoctorLayout';

// Auth
import AuthSelect from '../pages/AuthSelect';
import Login      from '../pages/auth/Login';
import Register   from '../pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';

// Public
import Landing from '../pages/Landing';

// Patient
import ChatOnboarding    from '../pages/patient/ChatOnboarding';
import PainMap           from '../pages/patient/PainMap';
import DoctorRecommend   from '../pages/patient/DoctorRecommend';
import DoctorProfilePage from '../pages/patient/DoctorProfilePage';
import PatientHome       from '../pages/patient/PatientHome';
import PatientProfile    from '../pages/patient/PatientProfile';
import MessagesPage      from '../pages/patient/MessagesPage';
import AlertsPage        from '../pages/patient/AlertsPage';
import TrackerPage       from '../pages/patient/TrackerPage';

// Doctor
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientsList    from '../pages/doctor/PatientsList';
import PatientDetail   from '../pages/doctor/PatientDetail';
import DoctorMessages  from '../pages/doctor/DoctorMessages';
import DoctorAnalytics from '../pages/doctor/DoctorAnalytics';
import DoctorSettings  from '../pages/doctor/DoctorSettings';

export default function AppRouter() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} />
      </Route>

      {/* ── Auth ── */}
      <Route path="/auth"          element={<AuthSelect />} />
      <Route path="/auth/login"    element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* ── Patient (protected) ── */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/patient/home" replace />} />
        <Route path="chat"       element={<ChatOnboarding />} />
        <Route path="pain-map"   element={<PainMap />} />
        <Route path="doctors"    element={<DoctorRecommend />} />
        <Route path="doctor/:id" element={<DoctorProfilePage />} />
        <Route path="home"       element={<PatientHome />} />
        <Route path="profile"    element={<PatientProfile />} />
        <Route path="messages"   element={<MessagesPage />} />
        <Route path="alerts"     element={<AlertsPage />} />
        <Route path="tracker"    element={<TrackerPage />} />
      </Route>

      {/* ── Doctor (protected) ── */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="dashboard"   element={<DoctorDashboard />} />
        <Route path="patients"    element={<PatientsList />} />
        <Route path="patient/:id" element={<PatientDetail />} />
        <Route path="messages"    element={<DoctorMessages />} />
        <Route path="analytics"   element={<DoctorAnalytics />} />
        <Route path="settings"    element={<DoctorSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
