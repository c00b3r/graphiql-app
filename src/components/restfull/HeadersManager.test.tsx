import { fireEvent, render, screen } from '@testing-library/react';
import HeadersManager from './HeadersManager';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('HeadersManager', () => {
  it('render', () => {
    const headers: {
      [key: string]: string;
    }[] = [];
    const setHeaders = vi.fn();
    const languageData = {};

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={languageData} />);

    expect(screen.getByLabelText('Header Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Header Value')).toBeInTheDocument();
    expect(screen.getByText('Add Header')).toBeInTheDocument();
  });
  it('adds a new header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: '', value: '' }];
    const setHeaders = vi.fn();
    const languageData = {};

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={languageData} />);

    fireEvent.change(screen.getByLabelText('Header Key'), { target: { value: 'Authorization' } });
    fireEvent.change(screen.getByLabelText('Header Value'), { target: { value: 'Bearer token' } });
    fireEvent.click(screen.getByText('Add Header'));

    expect(setHeaders).toHaveBeenCalled();
  });
  it('delete header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: 'Authorization', value: 'Bearer token' }];
    const setHeaders = vi.fn();
    const languageData = {};

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={languageData} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(setHeaders).toHaveBeenCalled();
  });
});
