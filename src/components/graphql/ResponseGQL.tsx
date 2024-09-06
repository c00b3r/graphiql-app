'use client';
import { IState } from '@/interfaces/interfaces';
import JsonViewer from '@/methods/graphql/jsonViewer';
import { useSelector } from 'react-redux';

export default function ResponseGQL() {
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const message = searchResults.result;
  const code = searchResults.code;
  const from = searchResults.from;
  const document = useSelector((state: IState) => state.main.documentation);
  const languageData = useSelector((state: IState) => state.main.languageData);

  return (
    <>
      <div className={`graphiql-block-response graphiql-block ${document ? 'graphiql_25' : ''}`}>
        <div className="response-wrapper">
          <h2 className="h2">{languageData.responseHeader}</h2>
          <div className={code !== 0 ? 'response-data-filled response-data' : 'response-data'}>
            <div>
              {languageData.status}: {code === 0 ? '' : code}
            </div>
            {code === 200 && message && (
              <>
                <div>{languageData.body}: </div>
                <div className="response-result">
                  {from ? JsonViewer(JSON.parse(message) as object) : JSON.parse(message)}
                </div>
              </>
            )}
            {code !== 200 && code !== 0 && (
              <div>
                {languageData.body}: <pre>{message as string}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
