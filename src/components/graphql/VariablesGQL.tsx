import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/app/GRAPHQL/interfaces';
import { dataFromUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { updateVariables } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { IResults } from '@/methods/interfaces';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function VariablesBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [variables, setVariables] = useState('');
  const [variablesVisible, showVariables] = useState(true);
  const query = useSelector((state: IState) => state.main.queryInput);
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const router = useRouter();
 
  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    if (partialData && partialData.variables) {
      setVariables(partialData.variables);
    }
  }, []);

  const changeUrlOnBlur = async () => {
    const newUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    router.push(`/GRAPHQL/${newUrl}`);
    // window.history.pushState(null, '', `/GRAPHQL/${newUrl}`);
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
              setVariables(e.target.value);
            }}
            onBlur={changeUrlOnBlur}
            rows={5}
          />
        )}{' '}
      </>
    </>
  );
}
