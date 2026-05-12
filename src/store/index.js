import { configureStore } from '@reduxjs/toolkit';
import authReducer        from './authSlice';
import onboardingReducer  from './onboardingSlice';
import trackerReducer     from './trackerSlice';

const store = configureStore({
  reducer: {
    auth:        authReducer,
    onboarding:  onboardingReducer,
    tracker:     trackerReducer,
  },
});

export default store;
