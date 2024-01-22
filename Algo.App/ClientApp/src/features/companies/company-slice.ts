import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Company, fetchCompanies } from './company-service';


export interface CompanyState {
    value: Company[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CompanyState = {
    value: [],
    status: 'idle',
};


export const fetchCompaniesAsync = createAsyncThunk(
    'companies/fetchCompanies',
    async (amount: number) => {
        const response = await fetchCompanies(amount);
        return response.data;
    }
);

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        clear: (state) => { state.value = []; },
        addCompany: (state, action: PayloadAction<Company>) => {
            state.value.push(action.payload);
        },
        addCompanies: (state, action: PayloadAction<Company[]>) => {
            state.value = [...state.value, ...action.payload];
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompaniesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompaniesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(fetchCompaniesAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clear, addCompanies } = companySlice.actions;
export const { reducer: companyReducer } = companySlice;

export const selectCompanies = (state: RootState) => state.company_state.value;
