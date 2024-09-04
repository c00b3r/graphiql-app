import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import Alerts from './Alert';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const MockAlerts = () => {
  return (
    <Provider store={store}>
      <Alerts />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockAlerts />);
  });
});
