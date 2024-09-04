import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';

export default function DocumentationGQL() {
  const document = useSelector((state: IState) => state.main.documentation);
  return (
    <>
      {document && (
        <>
          <div className={`graphiql-block graphiql-block-response ${document ? 'graphiql_25' : ''}`}>
            <h2 className="h2">Documentation</h2>
            {document && <pre className="documentation_wrapper">{document}</pre>}
          </div>
        </>
      )}
    </>
  );
}
