/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { extractQueryName } from '@/methods/extractQName';
import { Link } from '@mui/material';
import { saveHistoryData, toggleHistoryPanel } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { mockQueryPoke } from '@/mocks/query';
import { mockVariablesPoke } from '@/mocks/variables';
import { mockHeadersPoke } from '@/mocks/headers';
import { mockEndpointUrlPoke, mockSdlUrl } from '@/mocks/urls';
import './history.css';
import { IState, IPostData } from '@/app/GRAPHQL/interfaces';

export default function HistoryModule() {
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector((state: IState) => state.main.data);
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);
  const closeWindow = async () => {
    dispatch(toggleHistoryPanel(!openHistoryPanel));
  };
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

  return (
    <>
      <div className="history-wrapper">
        <button onClick={closeWindow}>x</button>
        {/* <button onClick={addMockHistory}>addMockHistory</button> */}
        <nav>
          <ul>
            {historyData.map((item: string, index) => {
              return (
                <li key={`historyKey${index}`}>
                  <Link
                    component="button"
                    underline="none"
                    color="black"
                    // href={``}
                    key={`historyKey${index + 1}`}
                    onClick={closeWindow}
                  >
                    {extractQueryName(item)}
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
