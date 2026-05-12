import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser } from '../store/authSlice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const user     = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function login(email, password, role) {
    return dispatch(loginUser(email, password, role));
  }

  function register(name, email, password, role) {
    return dispatch(registerUser(name, email, password, role));
  }

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
