import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    injury:      null,   // 'shoulder' | 'knee' | 'neck' | 'back'
    side:        'left', // 'left' | 'right'
    painPoints:  [],     // body hotspot ids selected on pain map
    limitations: [],     // movement limitation labels
  },
  reducers: {
    setInjury(state, action) {
      state.injury = action.payload;
    },
    setSide(state, action) {
      state.side = action.payload;
    },
    setPainPoints(state, action) {
      state.painPoints = action.payload;
    },
    togglePainPoint(state, action) {
      const id = action.payload;
      const idx = state.painPoints.indexOf(id);
      if (idx === -1) state.painPoints.push(id);
      else state.painPoints.splice(idx, 1);
    },
    setLimitations(state, action) {
      state.limitations = action.payload;
    },
    toggleLimitation(state, action) {
      const lbl = action.payload;
      const idx = state.limitations.indexOf(lbl);
      if (idx === -1) state.limitations.push(lbl);
      else state.limitations.splice(idx, 1);
    },
    resetOnboarding(state) {
      state.injury     = null;
      state.side       = 'left';
      state.painPoints = [];
      state.limitations = [];
    },
  },
});

export const {
  setInjury, setSide,
  setPainPoints, togglePainPoint,
  setLimitations, toggleLimitation,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
