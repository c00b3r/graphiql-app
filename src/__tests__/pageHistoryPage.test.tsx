import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import HistoryPage from '../app/history/page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react', async () => {
  const actualReact = await import('react');
  return {
    ...actualReact,
    useEffect: vi.fn(),
  };
});

const MockHistoryPage = () => {
  return (
    <Provider store={store}>
      <HistoryPage />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockHistoryPage />);
  });
});
