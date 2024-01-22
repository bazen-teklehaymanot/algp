import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GlobalFilterState {
  name: string
}

const initialState: GlobalFilterState = {
  name: ''
};


export const globalFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  
});

export const { updateFilterName } = globalFilterSlice.actions;

export const selectFilterName = (state: RootState) => state.globalFilter.name;

export const { reducer: globalFilterReducer } = globalFilterSlice;
