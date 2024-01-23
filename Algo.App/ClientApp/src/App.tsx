import { Fragment, useLayoutEffect } from 'react';
import { VisualizationContainer } from './app-container';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCompaniesAsync } from './features/companies/company-slice';

function App() {
  const company_state = useAppSelector(state => state.company_state);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchCompaniesAsync(50))
  }, []);


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
        <VisualizationContainer />
      }

    </Fragment>
  );
}

export default App;
