import { updateQuery } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import gqlPrettier from 'graphql-prettier';
import { IState } from '@/app/GRAPHQL/interfaces';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';


export default function GqlQueryInput() {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: IState) => state.main.queryInput);

  const prettifyQuery = () => {
    dispatch(updateQuery(gqlPrettier(query)));
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
        </div>
      </div>
      <textarea
        className="textarea textarea-query"
        value={query}
        onChange={(e) => {
          dispatch(updateQuery(e.target.value));
        }}
        onBlur={changeUrlOnBlur}
        rows={5}
      />
    </>
  );
}
