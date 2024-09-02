'use client';
import { useEffect } from 'react';
import { mockQueryPoke, mockQuerySwapiNetlify } from '../../mocks/query';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { mockHeadersPoke, mockHeadersSwapi } from '@/mocks/headers';
import { mockVariablesPoke } from '@/mocks/variables';
import { mockEndpointUrlPoke, mockEndpointUrlSwapiNetlify } from '@/mocks/urls';
import { Button } from '@mui/material';
import ResponseGQL from '@/components/graphql/ResponseGQL';
import SDLUrlInput from '@/components/graphql/SdlUrl';
import EndpointUrlInput from '@/components/graphql/EndpointUrl';
import HeadersBlock from '@/components/graphql/HeadersBlock';
import GqlQueryInput from '@/components/graphql/GqlQueryInput';
import VariablesBlock from '@/components/graphql/VariablesGQL';
import DocumentationGQL from '@/components/graphql/Documentation';
import { saveResponse, setAlertMessage, updateAllDataWhenPageLoads, updateSDL } from '@/reducers/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { gql, request } from 'graphql-request';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { saveHistory } from '@/methods/saveHistoryData';
import Alerts from '@/components/Alert';
import gqlPrettier from 'graphql-prettier';
import './page.css';
import { IState, IHeaders } from '@/interfaces/interfaces';

export default function GraphQL() {
  const dispatch = useDispatch<AppDispatch>();
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const sdlUrl = useSelector((state: IState) => state.main.sdlUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const errorMessage = useSelector((state: IState) => state.main.error);

  useEffect(() => {
    dispatch(saveResponse(false, 0));
  });

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log('123');
    dispatch(updateAllDataWhenPageLoads(currentUrl));
  }, []);

  const handleSubmitInput = async () => {
    handleSubmit();
  };

  const handleSubmitPoke = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(
      mockEndpointUrlPoke,
      mockHeadersPoke,
      gqlPrettier(mockQueryPoke),
      mockVariablesPoke
    );
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    dispatch(updateAllDataWhenPageLoads(newUrl));
    dispatch(updateSDL(`${mockEndpointUrlPoke}?sdl`));
  };

  const handleSubmitSwapi = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(mockEndpointUrlSwapiNetlify, mockHeadersSwapi, mockQuerySwapiNetlify, '');
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    dispatch(updateAllDataWhenPageLoads(newUrl));
    dispatch(updateSDL(`${mockEndpointUrlSwapiNetlify}?sdl`));
  };

  const showAlert = (error: string) => {
    dispatch(setAlertMessage(error));
    if (errorMessage === '') {
      setTimeout(() => {
        dispatch(setAlertMessage(''));
      }, 3000);
    }
  };

  const handleSubmit = async () => {
    let variablesSubmit: string | object = variables === '' || Object.keys(variables).length === 0 ? '{}' : variables;
    try {
      if (typeof variablesSubmit !== 'object') {
        const parsedVariables: object = JSON.parse(variablesSubmit);
        variablesSubmit = parsedVariables;
      }
      try {
        const queryTransformed = gql`
          ${query}
        `;
        try {
          const checkedHeaders: IHeaders[] = JSON.parse(headers);
          const headersTransformed = Object.fromEntries(checkedHeaders.map((h) => [h.key, h.value]));
          const body = await request(endpointUrl, queryTransformed, variablesSubmit, headersTransformed);
          dispatch(saveResponse(JSON.stringify(body), 200));
          const currentUrl = window.location.href;
          saveHistory(currentUrl, 'GraphiQL', sdlUrl);
          // setDocumentationVisible(true);
          // setDocumentation('');
          // dispatch(saveHistoryData(currentUrl));
        } catch {
          showAlert('Invalid graphql query');
          console.log('err1');
        }
      } catch {
        showAlert('Invalid graphql query');
        console.log('err2');
      }
    } catch {
      showAlert('Invalid variables');
      console.log('err3');
    }
  };

  return (
    <div className="graphql_page_wrapper">
      <Alerts></Alerts>

      {/* <HistoryModule></HistoryModule> */}
      <div className="graphiql-wrapper">
        <h2 className="h2">GraphiQL Client</h2>
        <EndpointUrlInput></EndpointUrlInput>
        <SDLUrlInput></SDLUrlInput>
        <HeadersBlock></HeadersBlock>
        <GqlQueryInput></GqlQueryInput>
        <VariablesBlock></VariablesBlock>
        <div>
          <Button onClick={handleSubmitInput}>Submit input</Button>
          <Button onClick={handleSubmitPoke}>Fill Poke</Button>
          <Button onClick={handleSubmitSwapi}>Fill Swapi</Button>
        </div>
      </div>
      <ResponseGQL></ResponseGQL>
      <DocumentationGQL></DocumentationGQL>
    </div>
  );
}
