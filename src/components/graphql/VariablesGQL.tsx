'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { updateVariables } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';
import { IState } from '@/interfaces/interfaces';

export default function VariablesBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [variablesVisible, showVariables] = useState(true);
  const query = useSelector((state: IState) => state.main.queryInput);
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const searchResults = useSelector((state: IState) => state.main.searchResults);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
  };

  const toggleVariables = () => {
    showVariables(!variablesVisible);
  };

  console.log('searchResults.result', searchResults.result);
  return (
    <>
      <div className="variables-wrapper">
        <h3 className="h3-width">
          Variables{' '}
          <Button onClick={toggleVariables}>
            {!variablesVisible && 'Show'}
            {variablesVisible && 'Hide'}
          </Button>
        </h3>
      </div>

      <>
        {variablesVisible && (
          <textarea
            className={`textarea textarea-variables ${searchResults.result ? 'textarea_borders_none' : ''}`}
            value={variables}
            onChange={(e) => {
              dispatch(updateVariables(e.target.value));
            }}
            onBlur={changeUrlOnBlur}
            rows={5}
          />
        )}{' '}
      </>
    </>
  );
}
