import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import GraphQL from '../app/GRAPHQL/page';
import { deleteCookie, setCookie } from 'cookies-next';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const MockGraphQL = () => {
  return (
    <Provider store={store}>
      <GraphQL />
    </Provider>
  );
};

describe('Search Component', () => {
  beforeEach(() => {
    setCookie('loginStatus', 'true', { maxAge: 86400 });
  });

  afterEach(() => {
    deleteCookie('loginStatus');
  });

  it('renders without crashing', () => {
    render(<MockGraphQL />);
  });
});
