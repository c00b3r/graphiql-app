import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { deleteCookie, setCookie } from 'cookies-next';
import GraphQLModule from '../app/GRAPHQL/[...params]/page';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const MockGraphQLModule = () => {
  return (
    <Provider store={store}>
      <GraphQLModule />
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
    render(<MockGraphQLModule />);
  });
});
