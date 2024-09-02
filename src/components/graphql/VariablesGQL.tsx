import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/app/GRAPHQL/interfaces';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { updateVariables } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button } from '@mui/material';

export default function VariablesBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [variablesVisible, showVariables] = useState(true);
  const query = useSelector((state: IState) => state.main.queryInput);
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
  };

  const toggleVariables = () => {
    showVariables(!variablesVisible);
  };

  return (
    <>
      <div className="variables-wrapper">
        <h3 className="h3-width">Variables</h3>
        <Button onClick={toggleVariables}>
          {!variablesVisible && 'Show'}
          {variablesVisible && 'Hide'}
        </Button>
      </div>

      <>
        {variablesVisible && (
          <textarea
            className="textarea textarea-variables"
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
