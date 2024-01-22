import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { globalFilterReducer } from '../features/filter/filter-slice';
import { companyReducer } from '../features/companies/company-slice';

export const store = configureStore({
  reducer: {
    globalFilter: globalFilterReducer,
    company_state: companyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
