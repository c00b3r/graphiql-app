'use client';
import React, { useState } from 'react';

export default function RestFull() {
  const [urlToSend, setUrlToSend] = useState<string>('');
  const [method, setMethod] = useState<string>('get');
  const [responseBody, setResponseBody] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const headerRow = (
    <>
      <input type="text" placeholder="Key" />
      <input type="text" placeholder="Value" />
    </>
  );

  const onChangeEndpointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToSend(e.target.value);
  };

  const onChangeMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(urlToSend, {
        method: method,
      });

      const status = response.status;
      setStatus(status);

      if (!response.ok && response.statusText) {
        setResponseBody(`HTTP Error ${status}: ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('Content-Type' || '');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setResponseBody(JSON.stringify(data, null, 2));
      } else {
        const text = await response.text();
        setResponseBody(`Response is not JSON:\n\n${text}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseBody(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="restfull-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className="request-container">
        <form className="endpoint" onSubmit={onSubmitHandler}>
          <select name="method" id="method" value={method} onChange={onChangeMethodHandler}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input type="text" placeholder="Enter URL" value={urlToSend} onChange={(e) => onChangeEndpointHandler(e)} />
          <button>Send</button>
        </form>
        <div className="manage-header-container">
          <button style={{ marginBottom: '10px', cursor: 'pointer' }}>Add Header</button>
          <div>{headerRow}</div>
        </div>
        <div className="body-container">
          <p>JSON</p>
          <textarea style={{ width: '400px', height: '100px', resize: 'none' }}></textarea>
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
