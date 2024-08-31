import { toggleHistoryPanel, updateQuery } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gqlPrettier from 'graphql-prettier';
import { IState } from '@/app/GRAPHQL/interfaces';
import { dataFromUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { useRouter } from 'next/navigation';
import { IResults } from '@/methods/interfaces';

export default function GqlQueryInput() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    if (partialData && partialData.query) {
      try {
        setQuery(gqlPrettier(partialData.query));
      } catch {
        setQuery(partialData.query);
        // wrong query, выкинуть ошибку
      }
    }
  }, []);

  const prettifyQuery = () => {
    setQuery(gqlPrettier(query));
  };
  const toggleHistory = () => {
    dispatch(toggleHistoryPanel(!openHistoryPanel));
  };

  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  const changeUrlOnBlur = async () => {
    const newUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    router.push(`/GRAPHQL/${newUrl}`);
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
          setQuery(e.target.value);
        }}
        onBlur={changeUrlOnBlur}
        rows={5}
      />
    </>
  );
}
