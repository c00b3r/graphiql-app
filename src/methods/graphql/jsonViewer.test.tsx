import { mockedResponsePoke } from '@/mocks/response';
import JsonViewer from './jsonViewer';
import { render } from '@testing-library/react';
import store from '@/reducers/root/rootReduces';
import { Provider } from 'react-redux';

describe('cartReducer', () => {
  it('should handle cleanObject correctly', () => {
    const NewState = JsonViewer(mockedResponsePoke);
    const MyComponent: React.FC = () => {
      return <div>{NewState}</div>;
    };
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    );
  });
});
