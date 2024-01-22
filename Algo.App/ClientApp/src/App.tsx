import { Fragment, useEffect } from 'react';
import { RentalDashboard } from './app-container';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCompaniesAsync } from './features/companies/company-slice';

function App() {
  const company_state = useAppSelector(state => state.company_state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompaniesAsync(10))
  }, []);

  useEffect(() => {
    console.log({ company_state })
  }, [company_state]);


  return (
    <Fragment>
      {
        company_state.status === 'loading' &&
        <div>Loading...</div>
      }
      {
        company_state.status === 'failed' &&
        <div>Failed to load</div>
      }
      {
        company_state.status === 'idle' &&
        company_state.value.length > 0 &&
        <RentalDashboard />
      }

    </Fragment>
  );
}

export default App;
