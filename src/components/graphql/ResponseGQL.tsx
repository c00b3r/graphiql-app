import { IState } from '@/app/GRAPHQL/interfaces';
import JsonViewer from '@/methods/graphql/jsonViewer';
import { useSelector } from 'react-redux';

export default function ResponseGQL() {
  // const [statusCode, setStatusCode] = useState<number | null>(null);
  // const [response, setResponse] = useState<string | null | object | unknown>(null);
  // const errorMessage = useSelector((state: IState) => state.main.searchResults);
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const message = searchResults.result;
  const code = searchResults.code;
  // console.log(errorMessage);
  // const showErrors = (err: unknown) => {
  //   const IError = err as IErrors;
  //   const statusCode = IError.response?.status || 500;
  //   const errorMessage = IError.response?.errors || IError.message;
  //    dispatch(saveErrorResponse(JSON.stringify(errorMessage), statusCode))
  // };

  return (
    <>
      <div className="response-wrapper">
        <h2 className="h2">Response</h2>
        <div className={code !== 0 ? 'response-data-filled response-data' : 'response-data' }>
          <div>Status: {code === 0 ? '' : code}</div>
          
          {code === 200 && message && (
            <>
              <div>Body: </div>
              <div>{JsonViewer(JSON.parse(message) as object)}</div>
            </>
          )}
          {code !== 200 && code !== 0 && (
            <div>
              Body: <pre>{message as string}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
