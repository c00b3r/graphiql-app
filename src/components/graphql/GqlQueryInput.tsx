'use client';
import { setAlertMessage, updateQuery } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import gqlPrettier from 'graphql-prettier';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { IState } from '@/interfaces/interfaces';

export default function GqlQueryInput() {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: IState) => state.main.queryInput);
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const languageData = useSelector((state: IState) => state.main.languageData);
  const errorMessage = useSelector((state: IState) => state.main.error);

  const showAlert = (error: string) => {
    dispatch(setAlertMessage(error));
    if (errorMessage === '') {
      setTimeout(() => {
        dispatch(setAlertMessage(''));
      }, 3000);
    }
  };
  
  const prettifyQuery = () => {
    try {
      dispatch(updateQuery(gqlPrettier(query)));
    } catch {
      showAlert(languageData.wrongGqlError)
    }
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
        <h3 className="h3-width">
        {languageData.queryHeader}<Button onClick={prettifyQuery}>{languageData.prettify}</Button>
        </h3>
      </div>
      <textarea
        className={`textarea textarea-query ${searchResults.result ? 'textarea_borders_none' : ''}`}
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
