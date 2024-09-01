import { IResults } from '../interfaces';
import { dataFromUrl } from './urlConverter';

export function extractQueryName(url: string) {
  const urlData: IResults | boolean = dataFromUrl(url, true);
  if (urlData) {
    const query = urlData.query;
    const regex = /query\s+(\w+)\s*\(/;
    const match = query.match(regex);
    return match ? match[1] : 'unnamed query';
  }
  return false;
}

export function extractQueryNameSmall(query: string) {
  try {
    const regex = /query\s+(\w+)\s*\(/;
    const match = query.match(regex);
    return match ? match[1] : 'unnamed query';
  }
  catch {
    return 'unnamed query';
  }
}
