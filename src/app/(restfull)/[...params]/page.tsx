'use client';
import React, { useEffect, useState } from 'react';

export default function RestFull() {
  const [urlToSend, setUrlToSend] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [responseBody, setResponseBody] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const [requestBody, setRequestBody] = useState<string>('');
  const [headers, setHeaders] = useState<Array<{ [key: string]: string }>>([]);
  const [headerKey, setHeaderKey] = useState<string>('');
  const [headerValue, setHeaderValue] = useState<string>('');
  const [isEditHeader, setEditHedaer] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [initialEditKey, setInitialEditKey] = useState<string | null>(null);
  const [variables, setVariables] = useState<Array<{ key: string; value: string }>>([]);
  const [isVariablesVisible, setVariablesVisible] = useState<boolean>(false);
  const [variableKey, setVariableKey] = useState<string>('');
  const [variableValue, setVariableValue] = useState<string>('');

  useEffect(() => {
    const path = window.location.pathname;
    const [method, encodedUrl, encodedBody] = path.split('/').slice(1);
    const queryString = window.location.search;

    if (method && encodedUrl) {
      setMethod(method);
      setUrlToSend(Buffer.from(encodedUrl, 'base64').toString('utf-8'));
      setRequestBody(encodedBody ? Buffer.from(encodedBody, 'base64').toString('utf-8') : '');

      const headersFromQuery = new URLSearchParams(queryString);
      const headersArray: Array<{ [key: string]: string }> = [];
      headersFromQuery.forEach((value, key) => {
        headersArray.push({
          key: decodeURIComponent(key),
          value: decodeURIComponent(value),
        });
      });
      setHeaders(headersArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'restfullState',
      JSON.stringify({
        urlToSend,
        method,
        requestBody,
        headers,
      })
    );
  }, [urlToSend, method, requestBody, headers]);

  useEffect(() => {
    updateUrl();
  }, [method, headers, urlToSend]);

  const updateUrl = () => {
    const encodedUrl = '/' + Buffer.from(urlToSend).toString('base64');
    const encodedBody = '/' + requestBody ? Buffer.from(requestBody).toString('base64') : '';
    const queryString = new URLSearchParams(
      headers.map(({ key, value }) => [key, encodeURIComponent(value)])
    ).toString();
    const newUrl = `/${method}${encodedUrl}${encodedBody}${queryString ? `?${queryString}` : ''}`;

    window.history.replaceState({}, '', newUrl);
  };

  const onChangeEndpointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToSend(e.target.value);
  };

  const onChangeMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const onChangeRequestBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestBody(e.target.value);
  };

  const onChangeHeaderKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderKey(e.target.value);
  };

  const onChangeHeaderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(e.target.value);
  };

  const addHeader = () => {
    if (headerKey && headerValue) {
      setHeaders((prevHeaders) => [...prevHeaders, { key: headerKey, value: headerValue }]);
      setHeaderKey('');
      setHeaderValue('');
    }
  };

  const deleteHeader = (key: string) => {
    setHeaders((prevHeaders) => prevHeaders.filter((header) => header.key !== key));
  };

  const editHeader = (key: string) => {
    const headerToEdit = headers.find((header) => header.key === key);
    if (headerToEdit) {
      setHeaderKey(headerToEdit.key);
      setHeaderValue(headerToEdit.value);
      setInitialEditKey(key);
      setEditKey(key);
      setEditHedaer(true);
    }
  };

  const saveHeader = () => {
    if (editKey && headerValue && initialEditKey) {
      setHeaders((prevHeaders) =>
        prevHeaders.map((header) => (header.key === initialEditKey ? { key: headerKey, value: headerValue } : header))
      );
      setHeaderKey('');
      setHeaderValue('');
      setEditKey(null);
      setInitialEditKey(null);
      setEditHedaer(false);
    }
  };

  const addVariable = () => {
    if (variableKey && variableValue) {
      setVariables([...variables, { key: variableKey, value: variableValue }]);
      setVariableKey('');
      setVariableValue('');
    }
  };

  const deleteVariable = (key: string) => {
    setVariables(variables.filter((variable) => variable.key !== key));
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fetchHeaders = new Headers();

      for (const [key, value] of Object.entries(headers)) {
        if (key.trim() && String(value).trim()) {
          fetchHeaders.append(key, String(value));
        }
      }

      const fetchOption: RequestInit = {
        method: method,
        headers: fetchHeaders,
      };

      if (method === 'POST' || method === 'PUT') {
        fetchHeaders.set('Content-Type', 'application/json');
        fetchOption.body = requestBody;

        const combinedBody = requestBody ? JSON.parse(requestBody) : {};
        variables.forEach(({ key, value }) => {
          combinedBody[key] = value;
        });

        fetchOption.body = JSON.stringify(combinedBody);
      }

      const response = await fetch(urlToSend, fetchOption);
      const status = response.status;
      setStatus(status);

      if (!response.ok && response.statusText) {
        if (response.status === 400) {
          const errorText = await response.text();
          setResponseBody(`HTTP Error ${status}: ${response.statusText}\n${errorText}`);
        } else {
          setResponseBody(`HTTP Error ${status}: ${response.statusText}`);
        }
        return;
      }

      if (method === 'HEAD') {
        const dataHeaders = Array.from(response.headers.entries());
        setResponseBody(dataHeaders.join(''));
        return;
      }

      if (method === 'OPTIONS') {
        const allowMethods = response.headers.get('Allow');

        if (allowMethods) {
          setResponseBody(`Allowed methods: ${allowMethods}`);
        } else {
          setResponseBody('No allowed methods provided by the server.');
        }

        return;
      }

      const contentType = response.headers.get('Content-Type' || '');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setResponseBody(JSON.stringify(data, null, 2));
      } else {
        const text = await response.text();
        setResponseBody(`Response is not JSON\n\n${text}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseBody(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div
      className="restfull-container"
      style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px' }}
    >
      <div className="request-container">
        <form className="endpoint" onSubmit={onSubmitHandler}>
          <select name="method" id="method" value={method} onChange={onChangeMethodHandler}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>HEAD</option>
            <option>OPTIONS</option>
            <option>PATCH</option>
          </select>
          <input type="text" placeholder="Enter URL" value={urlToSend} onChange={(e) => onChangeEndpointHandler(e)} />
          <button style={{ cursor: 'pointer' }}>Send</button>
        </form>
        <div className="manage-header-container">
          <button onClick={addHeader} style={{ marginBottom: '10px', cursor: 'pointer' }}>
            Add Header
          </button>
          <div>
            <input
              type="text"
              placeholder="Header Key"
              value={headerKey}
              onChange={onChangeHeaderKey}
              style={{ marginRight: '5px' }}
            />
            <input type="text" placeholder="Header Value" value={headerValue} onChange={onChangeHeaderValue} />
            {isEditHeader ? <button onClick={saveHeader}>Save</button> : null}
          </div>
          <div>
            {headers.map(({ key, value }) => (
              <p key={value} style={{ display: 'flex', gap: '5px' }}>
                {key}: {value}
                <button onClick={() => editHeader(key)}>Edit</button>
                <button onClick={() => deleteHeader(key)}>Delete</button>
              </p>
            ))}
          </div>
        </div>
        <div className="variables-section">
          <button onClick={() => setVariablesVisible(!isVariablesVisible)}>
            {isVariablesVisible ? 'Hide Variables' : 'Show Variables'}
          </button>
          {isVariablesVisible && (
            <div>
              <h3>Variables</h3>
              <input
                type="text"
                placeholder="Variable Key"
                value={variableKey}
                onChange={(e) => setVariableKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="Variable Value"
                value={variableValue}
                onChange={(e) => setVariableValue(e.target.value)}
              />
              <button onClick={addVariable}>Add Variable</button>

              <div>
                {variables.map((variable, index) => (
                  <p key={index}>
                    {variable.key}: {variable.value}
                    <button onClick={() => deleteVariable(variable.key)}>Delete</button>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="body-container">
          <p>JSON:</p>
          <textarea
            value={requestBody}
            onChange={onChangeRequestBody}
            onBlur={() => {
              updateUrl();
            }}
            style={{ width: '400px', height: '100px', resize: 'none' }}
          ></textarea>
        </div>
      </div>
      <div className="response-container">
        <p>
          Status: <em>{status}</em>
        </p>
        <p>Body (JSON):</p>
        <textarea readOnly value={responseBody} style={{ width: '400px', height: '200px', resize: 'none' }}></textarea>
      </div>
    </div>
  );
}
