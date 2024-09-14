import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import EndpointUrlInput from './EndpointUrl';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));


const MockEndpointUrlInput = () => {
  return (
    <Provider store={store}>
      <EndpointUrlInput />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockEndpointUrlInput />);
  });
});
