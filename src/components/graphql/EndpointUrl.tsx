'use client';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEndpoint } from '@/reducers/actions/actions';
import { IState } from '@/interfaces/interfaces';

export default function EndpointUrlInput() {
  const dispatch = useDispatch<AppDispatch>();
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const languageData = useSelector((state: IState) => state.main.languageData);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
  };

  return (
    <>
      <div className="graphiql-input-wrapper">
        <h3
          className={`${languageData.graphQlHeader === 'GraphiQL Client' ? 'url_graphql' : 'url_graphql-ru'} 'h3-width'`}
        >
          {languageData.endpointUrlHeader}
        </h3>
        <Input
          type="text"
          className="graphiql-input"
          value={endpointUrl}
          onChange={(e) => {
            dispatch(updateEndpoint(e.target.value));
          }}
          onBlur={changeUrlOnBlur}
        />
      </div>
    </>
  );
}
