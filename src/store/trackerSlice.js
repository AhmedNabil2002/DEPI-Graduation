import { createSlice } from '@reduxjs/toolkit';

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    exerciseIndex: 0,
    side:          'left',
    targetReps:    10,
    reps:          0,
    log:           [],     // { repNum, exKey, exNameEn, side, peakAngle, time }
    isTracking:    false,
    isRunning:     false,
  },
  reducers: {
    setExerciseIndex(state, action) {
      state.exerciseIndex = action.payload;
    },
    setSide(state, action) {
      state.side = action.payload;
    },
    setTargetReps(state, action) {
      state.targetReps = action.payload;
    },
    setTracking(state, action) {
      state.isTracking = action.payload;
    },
    setRunning(state, action) {
      state.isRunning = action.payload;
    },
    addRep(state, action) {
      // payload: { exKey, exNameEn, side, peakAngle, time }
      state.reps += 1;
      state.log.push({ repNum: state.reps, ...action.payload });
    },
    resetSession(state) {
      state.reps       = 0;
      state.log        = [];
      state.isRunning  = false;
      state.isTracking = false;
    },
    resetReps(state) {
      state.reps = 0;
      state.log  = [];
    },
  },
});

export const {
  setExerciseIndex, setSide, setTargetReps,
  setTracking, setRunning,
  addRep, resetSession, resetReps,
} = trackerSlice.actions;

export default trackerSlice.reducer;
