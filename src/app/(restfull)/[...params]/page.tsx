'use client';
import React, { useEffect, useState } from 'react';
import { addToHistory } from '@/reducers/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers/root/rootReduces';

export default function RestFull() {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.restFull.history);
  const [urlToSend, setUrlToSend] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [responseBody, setResponseBody] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const [requestBody, setRequestBody] = useState<string>('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});
  const [headerKey, setHeaderKey] = useState<string>('');
  const [headerValue, setHeaderValue] = useState<string>('');
  const [isEditHeader, setEditHedaer] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [initialEditKey, setInitialEditKey] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const [method, encodedUrl, encodedBody] = path.split('/').slice(1);
    const queryString = window.location.search;

    if (method && encodedUrl) {
      setMethod(method);
      setUrlToSend(Buffer.from(encodedUrl, 'base64').toString('utf-8'));
      setRequestBody(encodedBody ? Buffer.from(encodedBody, 'base64').toString('utf-8') : '');

      const headersFromQuery = new URLSearchParams(queryString);
      const headersObject: { [key: string]: string } = {};
      headersFromQuery.forEach((value, key) => {
        headersObject[key] = decodeURIComponent(value);
      });
      setHeaders(headersObject);
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
      Object.entries(headers).map(([key, value]) => [key, encodeURIComponent(value)])
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
      setHeaders((prevHeaders) => ({ ...prevHeaders, [headerKey]: headerValue }));
      setHeaderKey('');
      setHeaderValue('');
    }
  };

  const deleteHeader = (key: string) => {
    setHeaders((prevHeaders) => {
      const updatedHeaders = { ...prevHeaders };
      delete updatedHeaders[key];
      return updatedHeaders;
    });
  };

  const editHeader = (key: string) => {
    setHeaderKey(key);
    setHeaderValue(headers[key]);
    setInitialEditKey(key);
    setEditKey(key);
    setEditHedaer(true);
  };

  const saveHeader = () => {
    if (editKey && headerValue && initialEditKey) {
      setHeaders((prevHeaders) => {
        const newHeaders = { ...prevHeaders };
        if (initialEditKey !== headerKey) {
          delete newHeaders[initialEditKey];
        }

        newHeaders[headerKey] = headerValue;

        return newHeaders;
      });
      setHeaderKey('');
      setHeaderValue('');
      setEditKey(null);
      setInitialEditKey(null);
      setEditHedaer(false);
    }
  };

  const handleHistoryClick = (item: {
    method: string;
    url: string;
    body: string;
    headers: { [key: string]: string };
  }) => {
    setMethod(item.method);
    setUrlToSend(item.url);
    setRequestBody(item.body);
    setHeaders(item.headers);
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fetchHeaders = new Headers();

      for (const [key, value] of Object.entries(headers)) {
        fetchHeaders.append(key, value);
      }

      const fetchOption: RequestInit = {
        method: method,
        headers: fetchHeaders,
      };

      if (method === 'POST' || method === 'PUT') {
        fetchHeaders.set('Content-Type', 'application/json');
        fetchOption.body = requestBody;
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

      const contentType = response.headers.get('Content-Type' || '');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setResponseBody(JSON.stringify(data, null, 2));
      } else {
        const text = await response.text();
        setResponseBody(`Response is not JSON\n\n${text}`);
      }

      dispatch(
        addToHistory({ method, url: urlToSend, body: requestBody, headers: Object.fromEntries(fetchHeaders.entries()) })
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseBody(`Error: ${error.message}`);
      }
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="restfull-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="request-container">
            <form className="endpoint" onSubmit={onSubmitHandler}>
              <select name="method" id="method" value={method} onChange={onChangeMethodHandler}>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input
                type="text"
                placeholder="Enter URL"
                value={urlToSend}
                onChange={(e) => onChangeEndpointHandler(e)}
              />
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
                {Object.entries(headers).map(([key, value]) => (
                  <p key={key} style={{ display: 'flex', gap: '5px' }}>
                    {key}: {value}
                    <button onClick={() => editHeader(key)}>Edit</button>
                    <button onClick={() => deleteHeader(key)}>Delete</button>
                  </p>
                ))}
              </div>
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
            <textarea
              readOnly
              value={responseBody}
              style={{ width: '400px', height: '200px', resize: 'none' }}
            ></textarea>
          </div>
          <div className="history-container">
            <h2>Request History</h2>
            {history.length === 0 && <p>No history available</p>}
            <ol>
              {history.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  style={{ cursor: 'pointer', marginBottom: '5px' }}
                >
                  {item.method} {item.url}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
