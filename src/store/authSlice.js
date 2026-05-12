import { createSlice } from '@reduxjs/toolkit';

const SESSION_KEY = 'physiohome_session';
const USERS_KEY   = 'physiohome_users';

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: (() => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } })(),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem(SESSION_KEY);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Thunks (synchronous side-effect actions)
export function loginUser(email, password, role) {
  return (dispatch) => {
    const match = loadUsers().find(
      u => u.email === email && u.password === password && u.role === role,
    );
    if (!match) throw new Error('Invalid email, password, or role.');
    const { password: _pw, ...session } = match;
    dispatch(setUser(session));
    return session;
  };
}

export function registerUser(name, email, password, role) {
  return (dispatch) => {
    const users = loadUsers();
    if (users.find(u => u.email === email))
      throw new Error('An account with this email already exists.');
    const newUser = { id: Date.now().toString(), name, email, password, role };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _pw, ...session } = newUser;
    dispatch(setUser(session));
    return session;
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(clearUser());
  };
}

export default authSlice.reducer;
