import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import DocumentationGQL from './Documentation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const MockDocumentationGQL = () => {
  return (
    <Provider store={store}>
      <DocumentationGQL />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockDocumentationGQL />);
  });
});
