import { useState } from 'react';

export default function DocumentationGQL() {
  const [documentation, setDocumentation] = useState<string | null | object | unknown>(null);
  const [documentationVisible, setDocumentationVisible] = useState(false);

  function deleteLater() {
    setDocumentationVisible(false);
    setDocumentation(null);
  }

  return (
    <>
      {documentationVisible && (
        <div>
          <h2 className="h2">Documentation</h2>
          <div onClick={deleteLater}>
            <pre>{JSON.stringify(documentation, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
