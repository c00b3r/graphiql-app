'use client';
import { IState } from '@/interfaces/interfaces';
import JsonViewer from '@/methods/graphql/jsonViewer';
import { useSelector } from 'react-redux';

export default function ResponseGQL() {
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const message = searchResults.result;
  const code = searchResults.code;
  const document = useSelector((state: IState) => state.main.documentation);

  return (
    <>
      <div className={`graphiql-block-response graphiql-block ${document ? 'graphiql_25' : ''}`}>
        <div className="response-wrapper">
          <h2 className="h2">Response</h2>
          <div className={code !== 0 ? 'response-data-filled response-data' : 'response-data'}>
            <div>Status: {code === 0 ? '' : code}</div>
            {code === 200 && message && (
              <>
                <div>Body: </div>
                <div className="response-result">{JsonViewer(JSON.parse(message) as object)}</div>
              </>
            )}
            {code !== 200 && code !== 0 && (
              <div>
                Body: <pre>{message as string}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
