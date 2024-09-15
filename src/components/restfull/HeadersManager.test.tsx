import { act, fireEvent, render, screen } from '@testing-library/react';
import HeadersManager from './HeadersManager';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { enLanguage } from '@/languages/languages';

describe('HeadersManager', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      const headers: {
        [key: string]: string;
      }[] = [];
      const setHeaders = vi.fn();
      render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);
    });
  });

  it('render', () => {
    const headers: {
      [key: string]: string;
    }[] = [];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    expect(screen.getByLabelText('Header Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Header Value')).toBeInTheDocument();
    expect(screen.getByText('ADD HEADER')).toBeInTheDocument();
  });

  it('adds a new header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: '', value: '' }];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.change(screen.getByLabelText('Header Key'), { target: { value: 'Authorization' } });
    fireEvent.change(screen.getByLabelText('Header Value'), { target: { value: 'Bearer token' } });
    fireEvent.click(screen.getByText('ADD HEADER'));

    expect(setHeaders).toHaveBeenCalled();
  });

  it('delete header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: 'Authorization', value: 'Bearer token' }];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(setHeaders).toHaveBeenCalled();
  });
});
