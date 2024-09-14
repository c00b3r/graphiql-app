'use client';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Stack,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';

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
  const [loading, setLoading] = useState(false);
  const languageData = useSelector((state: IState) => state.main.languageData);
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        router.push('/');
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

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

  const onChangeMethodHandler = (e: SelectChangeEvent) => {
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
    setLoading(true);

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

    setLoading(false);
  };

  if (initialLoading) {
    return <Loader />;
  }

  if (!loginStatus) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} width={600}>
          <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
            {languageData.restfullClient}
          </Typography>
          <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
            <Box
              component="form"
              sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between' }}
              onSubmit={onSubmitHandler}
            >
              <Select
                size="small"
                name="method"
                id="method"
                value={method}
                onChange={onChangeMethodHandler}
                sx={{ width: 100 }}
              >
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
                <MenuItem value="HEAD">HEAD</MenuItem>
                <MenuItem value="OPTIONS">OPTIONS</MenuItem>
                <MenuItem value="PATCH">PATCH</MenuItem>
              </Select>
              <TextField
                id="text"
                value={urlToSend}
                placeholder={languageData.enterUrl}
                variant="outlined"
                size="small"
                onChange={onChangeEndpointHandler}
                sx={{ flex: 1 }}
              />
              <Button type="submit" variant="outlined" size="small">
                {languageData.send}
              </Button>
              {loading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: '15px',
              }}
            >
              <Typography variant="h6" component="h3" fontWeight={600}>
                {languageData.headersHeader}:
              </Typography>
              <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                <TextField
                  label={languageData.headerKey}
                  variant="standard"
                  value={headerKey}
                  onChange={onChangeHeaderKey}
                />
                <TextField
                  label={languageData.headerValue}
                  variant="standard"
                  value={headerValue}
                  onChange={onChangeHeaderValue}
                />
                <Button variant="outlined" size="small" onClick={addHeader}>
                  {languageData.addHeader}
                </Button>
                {isEditHeader ? (
                  <Button variant="outlined" size="small" onClick={saveHeader}>
                    {languageData.save}
                  </Button>
                ) : null}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  gap: '15px',
                }}
              >
                {headers.map(({ key, value }) => (
                  <Typography
                    variant="h6"
                    component="div"
                    key={value}
                    sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    {key}: {value}
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Button variant="outlined" size="small" onClick={() => editHeader(key)}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => deleteHeader(key)}>
                        Delete
                      </Button>
                    </Stack>
                  </Typography>
                ))}
              </Box>
            </Box>

            <Stack direction="column" alignItems="flex-start" spacing={2}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {languageData.variablesHeader}:
              </Typography>
              <Button variant="outlined" size="small" onClick={() => setVariablesVisible(!isVariablesVisible)}>
                {isVariablesVisible ? languageData.hideVariables : languageData.showVariables}
              </Button>
              {isVariablesVisible && (
                <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                  <TextField
                    type="text"
                    label="Variable Key"
                    variant="standard"
                    value={variableKey}
                    onChange={(e) => setVariableKey(e.target.value)}
                  />
                  <TextField
                    type="text"
                    label="Variable Value"
                    variant="standard"
                    value={variableValue}
                    onChange={(e) => setVariableValue(e.target.value)}
                  />
                  <Button variant="outlined" size="small" onClick={addVariable}>
                    Add Variable
                  </Button>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  gap: '15px',
                }}
              >
                {variables.map((variable, index) => (
                  <Typography
                    variant="h6"
                    component="div"
                    key={index}
                    sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    {variable.key}: {variable.value}
                    <Button variant="outlined" size="small" onClick={() => deleteVariable(variable.key)}>
                      Delete
                    </Button>
                  </Typography>
                ))}
              </Box>
            </Stack>

            <div className="body-container">
              <Typography variant="h6" component="h3" fontWeight={600}>
                {languageData.json}
              </Typography>
              <TextField
                value={requestBody}
                onChange={onChangeRequestBody}
                onBlur={updateUrl}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ resize: 'none' }}
              />
            </div>
          </Stack>

          <Box sx={{ width: '100%' }} className="response-container">
            <Typography variant="h6" component="h3" fontWeight={600}>
              {languageData.status}: <em>{status}</em>
            </Typography>
            <Typography variant="h6" component="h3" fontWeight={600}>
              {languageData.bodyJson}:
            </Typography>
            <Box
              sx={{
                maxHeight: '200px',
                minHeight: '150px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
              }}
            >
              <Typography variant="body1" component="pre">
                {responseBody}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>
    </main>
  );
}
