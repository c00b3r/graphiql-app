'use client';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button, Input } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHeaders } from '@/reducers/actions/actions';
import { IState, IHeaders } from '@/interfaces/interfaces';
import { enLanguage, ruLanguage } from '@/languages/languages';

export default function HeadersBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [headersVisible, showHeaders] = useState(true);
  const [enabledEditButtons, setEditButtons] = useState<number[]>([]);
  const [newHeaderKey, setNewHeaderKey] = useState<string>('');
  const [newHeaderValue, setNewHeaderValue] = useState<string>('');
  const languageData = localStorage.getItem('language_data') === 'ru' ? ruLanguage : enLanguage;


  const headersStringified = useSelector((state: IState) => state.main.headersKeys);
  const headers: IHeaders[] = headersStringified !== '' ? JSON.parse(headersStringified) : [{ key: '', value: '' }];
  const endpointUrlInput = useSelector((state: IState) => state.main.endpointUrlInput);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  const changeUrlOnBlur = async (newHeaders: IHeaders[]) => {
    dispatch(updateHeaders(newHeaders));
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrlInput, newHeaders, query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);

    window.history.pushState({}, '', newUrl);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    dispatch(updateHeaders(newHeaders));
    changeUrlOnBlur(newHeaders);
  };

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    const keyValueFromArray = newHeaders[index];
    if (field === 'key') {
      keyValueFromArray.key = value;
    } else {
      keyValueFromArray.value = value;
    }
    dispatch(updateHeaders(newHeaders));
  };

  const clearHeaderInput = () => {
    setNewHeaderValue('');
    setNewHeaderKey('');
  };

  const changeHeader = (index: number) => {
    const filterd = [...enabledEditButtons].filter((item) => item !== index);
    setEditButtons(filterd);
    changeUrlOnBlur(headers);
  };

  const editHeader = (index: number) => {
    const newArray = [...enabledEditButtons];
    newArray.push(index);
    setEditButtons(newArray);
  };

  const addHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      const newHeaders = [...headers, { key: newHeaderKey, value: newHeaderValue }];
      dispatch(updateHeaders(newHeaders));
      clearHeaderInput();
      changeUrlOnBlur(newHeaders);
    } else {
      if (!newHeaderKey) {
        // Напиши ключ
      }
      if (!newHeaderValue) {
        // Напиши значение
      }
    }
  };

  const toggleHeaders = () => {
    showHeaders(!headersVisible);
  };

  return (
    <>
      <div className="headers-wrapper">
        <div className="graphiql-input-wrapper">
          <h3 className="h3-width">
            {languageData.headersHeader}
            <Button onClick={toggleHeaders}>
              {!headersVisible && languageData.show}
              {headersVisible && languageData.hide}
            </Button>
          </h3>
        </div>
        {headersVisible && (
          <div className="headers-wrapper-inner">
            <div className="headers-element">
              <Input
                className='header_input_gql'
                type="text"
                placeholder={languageData.headerKey}
                value={newHeaderKey}
                onChange={(e) => setNewHeaderKey(e.target.value)}
              />
              <Input
                className='header_input_gql'
                type="text"
                placeholder={languageData.headerValue}
                value={newHeaderValue}
                onChange={(e) => setNewHeaderValue(e.target.value)}
              />
              <div className="header-buttons-wrapper">
                <Button onClick={addHeader}>{languageData.add}</Button>
                <Button onClick={clearHeaderInput}>{languageData.clear}</Button>
              </div>
            </div>
            {headers.map((header, index) => {
              return (
                <div className="headers-element" key={`header-${index}`}>
                  <Input
                    type="text"
                    placeholder="Header Key"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    disabled={!enabledEditButtons.includes(index)}
                  />
                  <Input
                    type="text"
                    placeholder="Header Value"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    disabled={!enabledEditButtons.includes(index)}
                  />
                  <div className="header-buttons-wrapper">
                    {!enabledEditButtons.includes(index) && (
                      <Button className={'header_button'} onClick={() => editHeader(index)}>
                        {languageData.edit}
                      </Button>
                    )}

                    {enabledEditButtons.includes(index) && (
                      <Button className={'header_button'} onClick={() => changeHeader(index)}>
                        {languageData.change}
                      </Button>
                    )}
                    <Button className={'header_button'} onClick={() => removeHeader(index)}>
                    {languageData.remove}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
