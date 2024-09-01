/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { extractQueryName, extractQueryNameSmall } from '@/methods/graphql/extractQName';
import { Button, Link } from '@mui/material';
import { saveHistoryData, toggleHistoryPanel, updateAllDataWhenPageLoads } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { mockQueryPoke } from '@/mocks/query';
import { mockVariablesPoke } from '@/mocks/variables';
import { mockHeadersPoke } from '@/mocks/headers';
import { mockEndpointUrlPoke, mockSdlUrl } from '@/mocks/urls';
import { IState, IPostData, IHistoryData } from '@/app/GRAPHQL/interfaces';
import { useEffect, useState } from 'react';
import { dataFromUrl } from '@/methods/graphql/urlConverter';
import { IResults } from '@/methods/interfaces';

const mockHistoryElement: IHistoryData = {
  name: '',
  data: {
    endpointUrl: '',
    sdlUrl: '',
    headers: [
      {
        key: '',
        value: '',
      },
    ],
    query: '',
    variables: '',
  },
  index: 0,
  url: '',
}

export default function HistoryModule() {
  const dispatch = useDispatch<AppDispatch>();
  // const historyData = useSelector((state: IState) => state.main.data);
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);
  // const [historyData, setHistory] = useState(['']);
  const [historyData, setHistory] = useState<IHistoryData[]>([mockHistoryElement]);

  const changeDataInInput = async (index: number) => {
    dispatch(updateAllDataWhenPageLoads(historyData[index].url));
    // поменять данные
    // поменять ссылку
  }

  const closeWindow = async () => {
    dispatch(toggleHistoryPanel(!openHistoryPanel));
  };

  const loadHistoryFromLS = () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('history_gql');
      if (savedState) {
        try {
          const historyArray = JSON.parse(savedState);
          const newHistoryArray: IHistoryData[] = [];
          historyArray.map((element: string, index: number) => {
            const mockCopy = JSON.stringify(mockHistoryElement);
            const newElement: IHistoryData = JSON.parse(mockCopy);
            try {
              const partialData: IResults | boolean = dataFromUrl(element, false);
              if (partialData) {
                newElement.data.endpointUrl = partialData.endpointUrl
                newElement.data.sdlUrl = partialData.endpointUrl
                newElement.data.query = partialData.query
                newElement.data.headers = partialData.headers
                newElement.data.variables = partialData.variables
                newElement.index = index;
                newElement.name = extractQueryNameSmall(partialData.query)
                newElement.url = element
                newHistoryArray.push(newElement)
              }
            } catch {
              console.log('Ошибка 324823487')
            }

          })
          setHistory(newHistoryArray);
        } catch {
          console.error('invalid data in local storage');
        }
      }
    }
  };

  // let checkDoubleSave = 0;

  useEffect(() => {
    loadHistoryFromLS();
  }, []);

  // const addMockHistory = async () => {
  // const postData = {
  //   endpointUrl: mockEndpointUrlPoke,
  //   sdlUrl: mockSdlUrl,
  //   headers: mockHeadersPoke,
  //   query: mockQueryPoke,
  //   variables: mockVariablesPoke,
  // };
  // dispatch(saveHistoryData(postData));
  // };

  function removeBaseUrl(fullUrl: string) {
    const url = new URL(fullUrl);
    const pathWithParams = `${url.pathname}${url.search}`;
    return pathWithParams;
  }

  return (
    <>
      <div className="history-wrapper">
        <Button onClick={closeWindow} className="close_hiwtory_block">
          x
        </Button>
        {/* <button onClick={addMockHistory}>addMockHistory</button> */}
        <nav>
          <ul>
            {historyData.map((item, index) => {
              return (
                <li key={`historyKey${index}`}>
                  <Link
                    underline="none"
                    color="black"
                    // href={removeBaseUrl(item)}
                    key={`historyKey${index + 1}`}
                    onClick={() => changeDataInInput(index)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
