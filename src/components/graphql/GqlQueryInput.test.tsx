import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import GqlQueryInput from './GqlQueryInput';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const MockGqlQueryInput = () => {
  return (
    <Provider store={store}>
      <GqlQueryInput />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockGqlQueryInput />);
  });
});
