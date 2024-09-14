import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import VariablesBlock from './VariablesGQL';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));


const MockVariablesBlock = () => {
  return (
    <Provider store={store}>
      <VariablesBlock />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockVariablesBlock />);
  });
});
