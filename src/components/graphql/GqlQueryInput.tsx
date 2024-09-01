import { toggleHistoryPanel, updateQuery } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gqlPrettier from 'graphql-prettier';
import { IState } from '@/app/GRAPHQL/interfaces';
import { dataFromUrl, makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { IResults } from '@/methods/interfaces';

export default function GqlQueryInput() {
  const dispatch = useDispatch<AppDispatch>();
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);
  // const [query, setQuery] = useState('');
  const query = useSelector((state: IState) => state.main.queryInput);

  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    if (partialData && partialData.query) {
      try {
        const newQuery = gqlPrettier(partialData.query);
        dispatch(updateQuery(newQuery))
        // setQuery();
      } catch {
        dispatch(updateQuery(partialData.query))
        // setQuery(partialData.query);
      }
    }
  }, []);

  const prettifyQuery = () => {
    // setQuery(gqlPrettier(query));
    dispatch(updateQuery(gqlPrettier(query)))
  };
  const toggleHistory = () => {
    dispatch(toggleHistoryPanel(!openHistoryPanel));
  };

  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    // dispatch(updateAllDataWhenPageLoads(newUrl));
  };

  return (
    <>
      <div className="query_wrapper">
        <h3 className="h3-width">Query</h3>{' '}
        <div>
          <Button onClick={prettifyQuery}>prettify</Button>
          <Button onClick={toggleHistory}>history</Button>
        </div>
      </div>
      <textarea
        className="textarea textarea-query"
        value={query}
        onChange={(e) => {
          dispatch(updateQuery(e.target.value));
          // setQuery(e.target.value);
        }}
        onBlur={changeUrlOnBlur}
        rows={5}
      />
    </>
  );
}
