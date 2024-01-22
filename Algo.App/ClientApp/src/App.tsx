import { Fragment, useLayoutEffect } from 'react';
import { RentalDashboard } from './app-container';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCompaniesAsync } from './features/companies/company-slice';

function App() {
  const { status, value } = useAppSelector(state => state.company_state);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(fetchCompaniesAsync(10))
  }, []);

  return (
    <Fragment>
      {
        status === 'loading' &&
        <div>Loading...</div>
      }
      {
        status === 'failed' &&
        <div>Failed to load</div>
      }
      {
        status === 'idle' &&
        value.length > 0 &&
        <RentalDashboard />
      }

    </Fragment>
  );
}

export default App;
