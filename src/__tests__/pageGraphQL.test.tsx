import { describe, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import GraphQL from '../app/GRAPHQL/page';
import { deleteCookie, setCookie } from 'cookies-next';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

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

  it('renders without crashing', async () => {
    await act(async () => {
      render(<MockGraphQL />);
    });
  });
});

