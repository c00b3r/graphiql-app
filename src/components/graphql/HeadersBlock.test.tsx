import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import HeadersBlock from './HeadersBlock';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockHeadersBlock = () => {
  return (
    <Provider store={store}>
      <HeadersBlock />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockHeadersBlock />);
  });
});
