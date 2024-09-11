import { createSlice } from '@reduxjs/toolkit';

const poolsSlice = createSlice({
  name: 'pools',
  initialState: { entities: [] },
  reducers: {
    setPoolsInfo: (state, entities) => {
      state.entities = [...entities.payload];
    },
  },
});

export const { setPoolsInfo } = poolsSlice.actions;
export default poolsSlice.reducer;
